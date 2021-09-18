FROM node:alpine

WORKDIR /app



COPY package.json .
# RUN npm install nodemon -g
RUN npm install
COPY . .

RUN npm uninstall bcrypt
RUN npm install bcrypt

CMD ["npm", "run", "serve"]