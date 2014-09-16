# Major-init

[Majordomo](https://github.com/nevyk/majordomo) command for initialization of a project.

## Installation

```bash
$ npm install major-init
```

## Usage

```bash
$ majordomo init
```

## Modules

- writes chosen modules to .majorfile

### git

- initializes empty Git repository
- creates .gitignore with `node_modules/` and `.majorfile`
- create LICENSE file with license you chose
- if you use GitHub it will add remote url to your GitHub repository

### npm

- writes details you gave to package.json

### bower

- writes details you gave to bower.json

## Todo

- authorize user via `npm adduser` if npm module is used

## License

Major-init is MIT licensed. Feel free to use it, contribute or spread the word. Created with love by Petr Nevyhoštěný ([Twitter](https://twitter.com/pnevyk)).