FROM node:latest

EXPOSE 19000
EXPOSE 19001
EXPOSE 19002

ENV ADP_IP="192.168.1.1"
ENV REACT_NATIVE_PACKAGER_HOSTNAME="192.168.100.20"

# RUN apk --update-cache --repository http://dl-3.alpinelinux.org/alpine/edge/testing/ add android-tools
# RUN apk add bash
RUN apt-get update && \
    apt-get install android-tools-adb -y

RUN npm install --global --unsafe-perm expo-cli


RUN mkdir /pitch
WORKDIR /pitch
COPY ./ /pitch
RUN ls
RUN npm install
RUN npm run android