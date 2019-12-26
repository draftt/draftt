FROM python:3.8-alpine
MAINTAINER Aaraj Habib

ENV PYTHONUNBUFFERRED 1

COPY ./requirements.txt /requirements.txt

#Installing postgres and its dependencies
RUN apk add --update --no-cache postgresql-client
RUN apk add --update --no-cache --virtual .tmp-build-deps \
    gcc libc-dev linux-headers postgresql-dev
#Installing everything else
RUN pip install -r /requirements.txt

#Delete the dependencies used for installing
RUN apk del .tmp-build-deps

RUN mkdir /app
WORKDIR /app
COPY ./app /app

RUN adduser -D user
USER user


