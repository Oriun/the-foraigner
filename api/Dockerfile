FROM node:18-alpine

WORKDIR /app

COPY ./package.json ./package.json

RUN yarn install

COPY ./ ./

CMD yarn start

# EXPOSE ${API_PORT}
