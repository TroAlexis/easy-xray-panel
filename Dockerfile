### BASE BUILD
FROM almalinux:latest as base

COPY start.sh .
RUN chmod +x start.sh

# --- Setup and configure easy-xray ---
WORKDIR /easy-xray

COPY easy-xray .
COPY install.sh .
RUN chmod +x ex.sh
RUN chmod +x install.sh

RUN dnf update --assumeyes
RUN dnf install --assumeyes jq openssl

ARG CDN_URL
ARG SERVER_IP
ARG WEBSITE_URL
ARG MODE
ARG GRPC_SERVICE_NAME

ENV MODE=$MODE

# Ports
EXPOSE 80
EXPOSE 443
EXPOSE 3000

# Run install script with predefined arguments
RUN ./install.sh

# --- Server setup ---
WORKDIR /server

RUN dnf module install nodejs:20 -y

COPY server/package*.json ./

RUN npm ci

COPY server .

### PRODUCTION BUILD
FROM base as build

RUN npm run build


### DEV BULD
FROM base as dev

# For nest.js hot reloading (needs 'ps' command) to work properly
RUN dnf install procps -y
