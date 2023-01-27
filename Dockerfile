FROM node:16-alpine as build
WORKDIR /project
RUN apk update && apk add yarn
COPY . .
RUN yarn
EXPOSE 3000
EXPOSE 3001
CMD ["yarn","run", "start"]