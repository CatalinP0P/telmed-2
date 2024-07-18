FROM node

WORKDIR /app

COPY . .

COPY prisma ./prisma/

RUN npm install

ARG SERVER_PORT
ARG DATABASE_URL

EXPOSE ${SERVER_PORT}

CMD [ "node", "index.js" ]