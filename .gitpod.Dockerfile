FROM gitpod/workspace-node

# Install Azure Function Core Tools
RUN npm i -g azure-functions-core-tools@4 --unsafe-perm true

# Install jest
RUN npm i -g jest