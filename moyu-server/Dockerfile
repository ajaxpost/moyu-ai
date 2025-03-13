FROM node:20.18.0-bullseye

WORKDIR /app

COPY . .

RUN yarn install

EXPOSE 9090

CMD node server.mjs