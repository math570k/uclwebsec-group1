FROM node:10-alpine

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app
COPY package-lock.json /app
COPY . /app

RUN apk --no-cache add --virtual builds-deps build-base python
RUN npm config set python /usr/bin/python
RUN npm i -g npm
RUN npm install
RUN npm rebuild bcrypt --build-from-source
RUN apk del builds-deps
RUN npm i -g nodemon

CMD ["npm", "run", "start"]