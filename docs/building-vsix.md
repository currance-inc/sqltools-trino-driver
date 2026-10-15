# Building the VSIX

This repository ships a VS Code extension package as a `.vsix` file for local installation in the SQLTools editor environment.

## Prerequisites

- Node.js installed locally
- Dependencies installed with `npm install`
- The project must be built with the VS Code bundled Node runtime when packaging, because `vsce` may otherwise fail while checking for Yarn or while resolving the host environment

## Build the extension bundle

Run the commands below from the repository root:

```bash
npm install
rm -rf out *.vsix
npm run esbuild
cp package.json ./out/ls
```

The plugin package itself must be exported in CommonJS format for SQLTools to load it correctly. The build output is written under `out/` and the runtime plugin is generated at `out/ls/plugin.js`.

## Package the VSIX

Use the VS Code bundled Node to avoid the environment mismatch that happens with the system Node 18:

```bash
/home/lucas/.vscode-server/bin/0958016b2af9f09bb4257e0df4a95e2f90590f9f/node ./node_modules/vsce/vsce package --allow-star-activation --no-yarn
```

The final artifact is generated in the repository root as:

```bash
sqltools-trino-driver-currance-0.2.13-currance.1.vsix
```

## Install locally in VS Code

1. Open VS Code
2. Run `Extensions: Install from VSIX...`
3. Select the generated file
4. Reload the window if prompted

This is the file to install for local testing in the SQLTools environment.

## Notes

- The plugin loader issue was fixed by exporting the language server plugin in the CommonJS shape expected by SQLTools.
- The `.node` native dependencies were excluded from bundling to keep the plugin loadable in the VS Code runtime.
- If `yarn` is not installed, always pass `--no-yarn` to `vsce`.
