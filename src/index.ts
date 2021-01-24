import { TextlintRuleModule } from "@textlint/types";
import { TxtNode } from "@textlint/ast-node-types";
import { ESLint } from "eslint";
import Source from "structured-source";
import prettier from "prettier";
export interface Options {
  allowComments?: boolean;
}

const defaultOptions: Options = {
  allowComments: false,
};

function excludeFenceCharacters(node: TxtNode, raw: string): string {
  if (!(raw.startsWith("```") && raw.endsWith("```"))) {
    if (node.value.endsWith("\n")) {
      return node.value;
    }
    return node.value + "\n";
  }
  const lines = raw.split("\n");
  // exclude fence characters
  const codeLines = lines.slice(1, lines.length - 1);
  return codeLines.join("\n") + "\n";
}

const report: TextlintRuleModule<Options> = (context, options = {}) => {
  const { Syntax, RuleError, report, fixer, getSource } = context;
  return {
    async [Syntax.CodeBlock](node) {
      if ("json".indexOf(node.lang) === -1) {
        return;
      }
      const raw = getSource(node);
      const code = excludeFenceCharacters(node, raw);
      const allowComments =
        options.allowComments || defaultOptions.allowComments;
      const eslint = new ESLint({
        baseConfig: {
          extends: ["plugin:json/recommended"],
          rules: { "json/*": ["error", { allowComments }] },
        },
        fix: true,
      });
      const source = new Source(code);
      const results = await eslint.lintText(code, { filePath: "*.json" });
      results.forEach((result) => {
        if (result.errorCount > 0) {
          result.messages.forEach((message) => {
            const sourceBlockDiffIndex =
              raw !== node.value ? raw.indexOf(code) : 0;
            const index = source.positionToIndex({
              line: message.line,
              column: message.column,
            });
            report(
              node,
              new RuleError(`${message.message}`, {
                index: index + sourceBlockDiffIndex - 1,
              })
            );
          });
        } else {
          // It formats a correct code only.
          // Because prettier raises an exception if a code has syntax errors
          const formattedText = prettier.format(code, { parser: "json" });
          if (code !== formattedText) {
            report(
              node,
              new RuleError(`Format error`, {
                fix: fixer.replaceText(
                  node,
                  "```json\n" + formattedText + "```"
                ),
              })
            );
          }
        }
      });
    },
  };
};

export default {
  linter: report,
  fixer: report,
};
