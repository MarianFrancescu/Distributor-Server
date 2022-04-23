# syntax=docker/dockerfile:1

FROM node:alpine
ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install -g nodemon
RUN npm install
COPY . .
CMD [ "npm", "run", "devStart" ]
EXPOSE 8080
# RUN npm run devStart