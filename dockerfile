FROM node:16.16.0

WORKDIR /app

COPY package.json ./

RUN npm install

EXPOSE 5173

CMD ["npm", "run", "dev" ]