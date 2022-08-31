# syntax=docker/dockerfile:1
FROM node:16
WORKDIR /automatisch

# npm registry for dev purposes
RUN npm config set fetch-retry-maxtimeout 5000
RUN npm config set fetch-retry-mintimeout 3000
RUN npm set registry http://localhost:5000
# npm registry for dev purposes

RUN mkdir -p /automatisch/storage
RUN touch /automatisch/storage/.env
RUN echo "ENCRYPTION_KEY=$(openssl rand -base64 36)" >> /automatisch/storage/.env
RUN echo "APP_SECRET_KEY=$(openssl rand -base64 36)" >> /automatisch/storage/.env
RUN yarn global add @automatisch/cli

EXPOSE 3000
CMD ["automatisch", "start", "--env-file=/automatisch/storage/.env"]
