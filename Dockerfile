FROM node:12
WORKDIR /usr/src/app/playfake
COPY . .
RUN npm install -g nodemon typescript