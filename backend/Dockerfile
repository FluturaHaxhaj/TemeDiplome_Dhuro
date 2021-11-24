FROM node:10.15.0-alpine
EXPOSE 3000 9229
WORKDIR /home/app
COPY package.json /home/app/
COPY package-lock.json /home/app/
RUN npm ci
RUN npm install -g knex
RUN npm install -g pg
RUN npm install -g moment-timezone
COPY . /home/app
CMD [ "npm", "start" ]