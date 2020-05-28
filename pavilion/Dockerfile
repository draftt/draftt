FROM python:3.8-alpine

ENV PYTHONUNBUFFERRED 1

COPY ./requirements.txt /requirements.txt

#Installing postgres and its dependencies
RUN apk add --update --no-cache postgresql-client
RUN apk add --update --no-cache --virtual .tmp-build-deps \
    gcc libc-dev linux-headers postgresql-dev

RUN apk add --no-cache python3-dev openssl-dev libffi-dev gcc && pip3 install --upgrade pip
#Installing everything else
RUN pip install -r requirements.txt

#Delete the dependencies used for installing
RUN apk del .tmp-build-deps

RUN mkdir /pavilion
WORKDIR /pavilion
COPY . /pavilion

RUN adduser -D user
USER user


