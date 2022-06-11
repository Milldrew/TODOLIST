FROM node:16-alpine3.11 AS BUILD_IMAGE

RUN apk update && apk add yarn curl bash make && rm -rf /var/cache/apk/*

RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

WORKDIR /usr/src/app

# install dependencies
RUN yarn --frozen-lockfile

COPY ./nest-todo-list ./nest-todo-list
COPY ./material-ng-todolist ./material-ng-todolist


WORKDIR /usr/src/app/material-ng-todolist
RUN npm install
RUN npm run build

WORKDIR /usr/src/app/nest-todo-list
RUN yarn install
RUN yarn build

RUN npm prune --production

FROM node:16-alpine3.11

USER 1000
RUN mkdir -p /home/node/app/
RUN mkdir -p /home/node/app/node_modules
RUN mkdir -p /home/node/app/dist

RUN chown -R 1000:1000 /home/node/app
RUN chown -R 1000:1000 /home/node/app/node_modules
RUN chown -R 1000:1000 /home/node/app/dist

WORKDIR /home/node/app

COPY --from=BUILD_IMAGE /usr/src/app/docs /home/node/app/docs
COPY --from=BUILD_IMAGE /usr/src/app/nest-todo-list/dist /home/node/app/nest-todo-list/dist
COPY --from=BUILD_IMAGE /usr/src/app/nest-todo-list/node_modules /home/node/app/nest-todo-list/node_modules

EXPOSE 3000
ENTRYPOINT ["node"]

CMD ["/home/node/app/nest-todo-list/dist/main.js"]
