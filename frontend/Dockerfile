# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=20.15.1

FROM node:${NODE_VERSION}-alpine

WORKDIR /usr/app

RUN npm install vite -g

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

RUN mkdir /usr/app/node_modules/.vite \
&& chown -R node:node /usr/app/node_modules/.vite


USER node

COPY . .

EXPOSE 5173

CMD npm run dev