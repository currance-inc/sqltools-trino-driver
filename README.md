<p align="center">
  <img src="icon.png" />
</p>

[![ci](https://github.com/regadas/sqltools-trino-driver/actions/workflows/ci.yml/badge.svg)](https://github.com/regadas/sqltools-trino-driver/actions/workflows/ci.yml)
![license](https://img.shields.io/github/license/regadas/trino-js-client)


# SQLTools Trino Driver

[Trino][trino] driver for VS Code [SQLTools extension](https://vscode-sqltools.mteixeira.dev/).


## Installation

- Directly from VS Code by searching `@tag:sqltools trino` or just `trino`;
- From [marketplace][trino-marketplace].

## Usage

After installation you will be able to explore tables and views, run queries, etc. For more details see SQLTools [documentation](https://vscode-sqltools.mteixeira.dev/features/bookmarks).

## Authentication

The driver supports the following authentication modes:

- Basic authentication with `user` and `password`.
- JWT bearer authentication with `accessToken`.

When `accessToken` is provided, the driver sends `Authorization: Bearer <token>` and it takes precedence over password authentication.

## Build VSIX

See [docs/building-vsix.md](docs/building-vsix.md) for the exact steps to generate the distributable `.vsix` file.

## Contributing

Please open GitHub issues and pull requests.

[trino]: https://trino.io
[trino-icon]: packages/driver.trino/icon.png
[trino-marketplace]: https://marketplace.visualstudio.com/items?itemName=regadas.sqltools-trino-driver
