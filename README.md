# textlint-rule-json

![](https://github.com/chick-p/textlint-rule-json/workflows/test/badge.svg?branch=master)

A textlint rule to lint code blocks of JSON in Markdown with ESLint and prettier.

## Install

Install with GitHub

```shell
npm install chick-p/textlint-rule-json
```

## Usage

Via `.textlintrc`(Recommended)

```json
{
  "rules": {
    "json": true
  }
}
```

Via CLI

```shell
textlint --rule json README.md
```

## Fixble

`textlint-rule-json` supports `--fix` option.  
The `--fix` options can format only JSON, but it does not fix wrong syntaxes.

## Options

Please write your configurations in `.textlintrc`.

```json
{
  "rules": {
    "json": {
      "allowComments": true,
    }
  }
}
```

### allowComments

This rule is ignore errors cause by comments. The default value is `false`.

## License

MIT © chick-p
