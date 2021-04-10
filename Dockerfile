FROM node:10-alpine

WORKDIR /api-login

COPY package.json .

RUN yarn install --quiet

COPY . .

EXPOSE 8080