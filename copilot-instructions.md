# Copilot Instructions

## Purpose

This repository is a VS Code SQLTools driver for Trino.

## Working rules

- Preserve the existing extension name unless the user explicitly asks to rename it.
- Keep the publisher aligned with the distribution target when packaging the extension.
- Prefer minimal, focused changes over broad refactors.
- When generating a `.vsix`, use the local `vsce` entrypoint with the Node 18 compatibility polyfill if the environment is below the tool's advertised engine range.
- Keep runtime dependencies available in the packaged extension so SQLTools can load the driver at activation time.

## Packaging

- Use the build steps in `docs/building-vsix.md` or the `package-vsix` task.
- Validate the generated VSIX by checking that the embedded manifest contains the expected publisher and display name.
