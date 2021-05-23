# syntax=docker/dockerfile:1

FROM node:12.18.1
ENV NODE_ENV=production

RUN npm install -g nodemon

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install --production

COPY . .

CMD [ "nodemon", "-L", "index.js" ]