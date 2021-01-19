import { TextlintRuleModule } from "@textlint/types";
import { TxtNode } from "@textlint/ast-node-types";
import { ESLint } from "eslint";
import Source from "structured-source";

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

const report: TextlintRuleModule = (context, _options = {}) => {
  const { Syntax, RuleError, report, getSource } = context;
  return {
    async [Syntax.CodeBlock](node) {
      if ("json".indexOf(node.lang) === -1) {
        return;
      }
      const raw = getSource(node);
      const code = excludeFenceCharacters(node, raw);
      const eslint = new ESLint({
        baseConfig: { extends: ["plugin:json/recommended"] },
        fix: true,
      });
      const source = new Source(code);
      const results = await eslint.lintText(code, { filePath: "*.json" });
      results.forEach((result) => {
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
      });
    },
  };
};
export default report;
