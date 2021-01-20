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

## Options

Please write your configurations in `.textlintrc`.

```json
{
  "rules": {
    "jsonlint": {
      "allowComments": true,
    }
  }
}
```

### allowComments

This rule is ignore errors cause by comments. The default value is `false`.

## License

MIT © chick-p
