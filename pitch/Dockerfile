FROM node:10-alpine

RUN apk add yarn

EXPOSE 19000
EXPOSE 19001
EXPOSE 19002

ENV ADB_IP="192.168.100.161"
ENV REACT_NATIVE_PACKAGER_HOSTNAME="192.168.100.20"

RUN apk --update-cache --repository http://dl-3.alpinelinux.org/alpine/edge/testing/ add android-tools
RUN apk add bash
RUN yarn global add expo-cli

WORKDIR /home/pitch
COPY . /home/pitch/
RUN ls
RUN hostname -I | awk '{print $1}'
RUN yarn global list
RUN yarn
RUN adb connect $ADB_IP && yarn run android