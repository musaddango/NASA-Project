FROM node:lts-alpine

WORKDIR /app

COPY . .

RUN npm install --only=production

RUN npm run build

USER node

CMD [ "npm", "start" ]

EXPOSE 8000