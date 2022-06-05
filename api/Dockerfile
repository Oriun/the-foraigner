FROM node:17-alpine

WORKDIR /app

COPY ./package.json ./package.json

RUN yarn install --production

COPY ./ ./

CMD yarn start

# EXPOSE ${API_PORT}