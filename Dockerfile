FROM node:16.13.0-alpine
LABEL Author dyegocruz@gmail.com

ENV APP_HOME=/hash-backend-challenge

RUN mkdir -p $APP_HOME
COPY . $APP_HOME
WORKDIR $APP_HOME
RUN npm install --no-audit
RUN npm run build

EXPOSE 3000

CMD npm run start:prod