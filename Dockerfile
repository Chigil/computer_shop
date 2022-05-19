FROM node

WORKDIR /usr/src/app/

COPY  package*.json /usr/src/app/
RUN npm install -g @nestjs/cli
RUN npm install -g npm@8.9.0
RUN npm install -g pg
RUN npm install @types/pg
RUN npm install
ENV NODE_ENV=${NODE_ENV}
COPY . /usr/src/app/
