FROM node:12-alpine
WORKDIR /usr/src/app/playfake
ENV PORT=8081
ENV MONGODB_PATH=mongodb+srv://app_owner_01:app_owner_01@cluster0-bgjen.mongodb.net/mydb
COPY . .
RUN npm install -g nodemon typescript
RUN npm install --no-bin-links && npm run build

CMD [ "npm", "start" ]