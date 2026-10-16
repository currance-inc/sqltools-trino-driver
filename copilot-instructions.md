# Copilot Instructions

## Purpose

This repository is a VS Code SQLTools driver for Trino.

## Working rules

- Preserve the existing extension name unless the user explicitly asks to rename it.
- Keep the publisher aligned with the distribution target when packaging the extension.
- Prefer minimal, focused changes over broad refactors.
- When generating a `.vsix`, prefer a portable flow using Node 20 or 22 and `npx @vscode/vsce --no-yarn`; avoid hardcoded machine paths such as `/home/...` or `.vscode-server` absolute paths in shared instructions.
- Keep runtime dependencies available in the packaged extension so SQLTools can load the driver at activation time.

## Packaging

- Use the build steps in `docs/building-vsix.md` or the `package-vsix` task.
- Prefer `npm run esbuild` + `npx @vscode/vsce package --allow-star-activation --no-yarn` over a machine-specific command.
- Validate the generated VSIX by checking that the embedded manifest contains the expected publisher and display name.
