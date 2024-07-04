FROM alpine:latest
COPY . /app
WORKDIR /app
RUN apk update && apk add nodejs redis npm
RUN npm install
EXPOSE 3000
EXPOSE 6379

ENTRYPOINT [ "npm", "start" ]
