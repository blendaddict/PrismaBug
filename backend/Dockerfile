FROM node:16

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

COPY . .

RUN npm install

EXPOSE 8000

CMD [ "node", "build/server.js" ]