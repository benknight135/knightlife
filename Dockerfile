FROM mcr.microsoft.com/vscode/devcontainers/universal

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install git
