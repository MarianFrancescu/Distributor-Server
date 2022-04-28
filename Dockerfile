# syntax=docker/dockerfile:1

FROM node:alpine
ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install -g nodemon
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "npm", "run", "devStart" ]