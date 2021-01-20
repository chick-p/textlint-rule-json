# textlint-rule-jsonlint

textlint rule to lint codeblocks of json in Markdown with ESLint and prettier.

## Install

Install with GitHub

```shell
npm install https://github.com/chick-p/textlint-rule-jsonlint.git
```

## Usage

Via `.textlintrc`(Recommended)

```json
{
  "rules": {
    "jsonlint": true
  }
}
```

Via CLI

```shell
textlint --rule jsonlint README.md
```

## License

MIT © chick-p
