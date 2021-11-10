FROM node:14-alpine3.12

WORKDIR /app

COPY . .

RUN yarn install --production

CMD ["node", "index.js"]

