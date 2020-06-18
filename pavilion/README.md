
# draftt-pavilion

[![Build Status][build-status]][build-status-url]
[![Code Style][code-style-image]][code-style-url]

This folder contains the backend for the application. It is built using Django, PostgreSQL and Django Rest Framework (DRF). DRF allows serving REST API endpoints for the mobile application to communicate with. 


## Requirements

* Docker  (Installation instructions [here](https://docs.docker.com/install/linux/docker-ce/ubuntu/) or [here](https://docs.docker.com/install/linux/docker-ce/ubuntu/))

## Getting Started
1. Clone repository and navigate to draftt/Server.
2. Start development server and database: `docker-compose up`


## Running Django Admin
 Once the development environment is set up, you will need to create admin user to accessing Django Admin. To do so:
 - `docker-compose run app sh -c "python manage.py createsuperuser`
 - Enter email and password to set it up.
 - Open `localhost:8000/admin` in browser.


## Application Structure

The application structure presented below is **fractal**, where functionality is grouped primarily by feature rather than file type. Please note, however, that this structure is only for the initial stages. It aims to represent generally accepted guidelines and patterns for building scalable applications.

```

pavilion
├── app  				# Main app configuration files
├── core  				# Application core module
├── user				# User handling api endpoint
├── internal_auth		# Authentication app following oauth2
├── codegen     		# Generates secure codes for verification
├── manage.py  
├── Dockerfile  		# Docker configs
├── README.md  
└── requirements.txt	# Reqs for docker to setup
```

## Testing
Tests for each feature are present in the `core\tests` folder. To run them, execute the following command from the server root directory.
	
 - `docker-compose run app sh -c "python manage.py test`
 - `docker-compose run app sh -c "python manage.py flake8`

## Documentation
- [Django](https://docs.djangoproject.com/en/2.2/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [Docker](https://docs.docker.com/)




[build-status]: https://travis-ci.org/aarajh/draftt.svg?branch=master
[build-status-url]: https://travis-ci.org/aarajh/draftt/
[code-style-image]: https://img.shields.io/badge/code%20style-pep8-orange.svg
[code-style-url]: https://www.python.org/dev/peps/pep-0008/
