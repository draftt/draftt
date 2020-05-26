FROM node:10-alpine

RUN apk add yarn

EXPOSE 19000
EXPOSE 19001
EXPOSE 19002

RUN apk --update-cache --repository http://dl-3.alpinelinux.org/alpine/edge/testing/ add android-tools
RUN apk add bash
RUN yarn global add expo-cli@3.0.11-alpha.1

WORKDIR /home/pitch
COPY . /home/pitch/
# RUN adb connect $ADB_IP && yarn run android