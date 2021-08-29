FROM node:alpine

WORKDIR /app

COPY package.json .
# RUN npm install nodemon -g
RUN npm install
COPY . .


CMD ["npm", "run", "serve"]