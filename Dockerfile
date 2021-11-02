FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm i -g knex
COPY . .
EXPOSE 80