![alt test](mockups/Logo.png)

![Lifecycle][lifecycle]

## Table of Contents

1. [Introduction](#introduction)

1. [Setup](#setup)
1. [Docs](#docs)
1. [Stack](#stack)
1. [Project Structure](#project-structure)
1. [Authors](#authors)

## Introduction

Draftt is a cricket fantasy league mobile application. It is built using React-Native and Django. This repository contains all of the development code and documentation for the project.

## Setup
1. Clone repository
1. Create/Update .env file in root directory with:
    `REACT_NATIVE_PACKAGER_HOSTNAME=YOUR_MACHINE_IP`
1. Start fullstack app (expo, api, database): `docker-compose up`


## Docs

Detailed docs can be accessed at [notion.so/draftt](https://notion.so/draftt/)

## Stack
- [React-Native](https://facebook.github.io/react-native/) 
- [Django](https://www.djangoproject.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)

## Project Structure

The project structure presented in this repository is divided into high level folders consisting of the frontend and backend code. Additional details regarding the structure are located inside each of these folders.
```
. 
├── pitch  			  # React-native App
├── Mockups  			# Design mockups
└── pavillion  			# Django API
```

## Authors

 - Adil Mian [@adil1508](https://github.com/adil1508)
 - Aaraj Habib [@aarajh](https://github.com/aarajh)


[lifecycle]: https://img.shields.io/badge/lifecycle-early%20development-orange
