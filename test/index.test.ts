import TextLintTester from "textlint-tester";
import rule from "../src/index";
const tester = new TextLintTester();
// ruleName, rule, { valid, invalid }
tester.run("rule", rule, {
  valid: [
    {
      text: "```json\n" + '{ "foo": "bar" }\n' + "```",
    },
    {
      text: "```json\n" + "// comment\n" + '{ "foo": "bar" }\n' + "```",
      options: {
        allowComments: true,
      },
    },
  ],
  invalid: [
    {
      text: "```json\n" + '{ "foo": bar }\n' + "```",
      errors: [
        {
          message: "Value expected",
          line: 2,
          column: 11,
        },
      ],
    },
    {
      text:
        "```json\n" +
        '{ "foo": bar }\n' +
        "```\n" +
        "This is text.\n" +
        "```json\n" +
        '{ "foo" }\n' +
        "```",
      errors: [
        {
          message: "Value expected",
          line: 2,
          column: 11,
        },
        {
          message: "Colon expected",
          line: 6,
          column: 10,
        },
      ],
    },
    {
      text: "```json\n" + "// comment\n" + '{ "foo": "bar" }\n' + "```",
      errors: [
        {
          message: "Comment not allowed",
          line: 2,
          column: 2,
        },
      ],
    },
    {
      text: "```json\n" + "{\n" + '"foo": "bar"\n' + "}\n" + "```",
      output: "```json\n{\n" + '  "foo": "bar"\n' + "}\n" + "```",
      errors: [
        {
          message: "Format error",
          line: 1,
          column: 1,
        },
      ],
    },
  ],
});
