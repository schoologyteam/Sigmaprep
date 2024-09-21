# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=20.15.1

FROM node:${NODE_VERSION}-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

USER root

CMD sh -c 'echo "NODE_ENV is: $NODE_ENV"; if [ "$NODE_ENV" = "prod" ]; then npm run build; else npm run dev; fi'
