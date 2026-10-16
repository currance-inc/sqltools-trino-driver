# Building the VSIX

This repository ships a VS Code extension package as a `.vsix` file for local installation in the SQLTools editor environment.

## Recommended approach

Use a portable build flow that does not depend on a hardcoded machine path. The safest default is Node 20 or 22 with `npx @vscode/vsce` and `--no-yarn`.

## Prerequisites

- Node.js 20 or 22 installed locally
- Dependencies installed with `npm install`
- Yarn not required for packaging in this project

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

Use a machine-portable command instead of an absolute path:

```bash
node -v
# if not on Node 20/22, switch with nvm
# nvm install 22
# nvm use 22

npm install
npm run esbuild
npx @vscode/vsce package --allow-star-activation --no-yarn
```

If you are running inside a VS Code Server or a custom environment and want to reuse the editor runtime, you can detect it dynamically:

```bash
VSCODE_NODE="${VSCODE_NODE:-$(find ~/.vscode-server ~/.vscode-server-insiders /usr/share/code /opt -type f -path '*/node' 2>/dev/null | head -n 1)}"
if [ -n "$VSCODE_NODE" ]; then
  "$VSCODE_NODE" ./node_modules/vsce/vsce package --allow-star-activation --no-yarn
else
  npx @vscode/vsce package --allow-star-activation --no-yarn
fi
```

The final artifact is generated in the repository root as:

```bash
currance-inc-sqltools-trino-driver-0.2.13-currance.1.vsix
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
- `vsce` should always be run with `--no-yarn` when Yarn is not installed in the target machine.
- Avoid absolute paths like `/home/lucas/...` in shared instructions; use `node`, `nvm`, or a machine-discovery snippet instead.
