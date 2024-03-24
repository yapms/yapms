# Getting Started

You can host a YAPms development environment by either using the provided devcontainer or installing the toolchain on your machine.

### Tested On

- NixOS

## Devcontainer

1. Install [Docker Desktop](https://docs.docker.com/get-docker/) or [Docker CLI on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
2. Clone the [GIT Repository](https://github.com/yapms/yapms)
3. Open the project in VSCode
4. Install the [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension
5. Run vscode command `Dev Containers: Rebuild and Reopen in Container`
6. Run shell command `npm run dev`

## On Machine

1. Install [Docker Desktop](https://docs.docker.com/get-docker/) or [Docker CLI on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
2. Install [NodeJS](https://nodejs.org)
3. Install [Go](https://go.dev/)
5. Clone the [GIT Repository](https://github.com/yapms/yapms)
6. Run shell command `npm install`
7. Run shell command `npx dotenv-vault pull example`
8. Run shell command `npx devcontainer up --workspace-folder .`
9. Run shell command `npm run dev`
