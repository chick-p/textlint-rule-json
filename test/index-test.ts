import TextLintTester from "textlint-tester";
import rule from "../src/index";
const tester = new TextLintTester();
// ruleName, rule, { valid, invalid }
tester.run("rule", rule, {
  valid: [
    {
      text: "```json\n" + '{ "foo": "bar" }\n' + "```",
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
  ],
});
