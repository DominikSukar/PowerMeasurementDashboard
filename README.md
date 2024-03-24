# PowerMeasurementDashboard
## Description
Power Measurement Dashboard provides user with a management system of current power consumption. It comes with emulators that act as dummies for real measurement system that provide data for the app. Additionally, frontend is secured by Keycloak app and everything is deployed via Docker.
## Requirements
1. Deployment was tested on docker v2.24.6 and docker-compose v25.0.3
## Deployment
1. docker-compose up --build -d
2. Enter localhost:8080
3. Log into keycloak with credentials specified in docker-compose.yml
4. Create realm with client specified in docker-compose.yml
5. Create user
6. Enjoy!
## Optional
1. You can create any number of emulators by specifying their deployment in docker-compose.yml and using the Dockerfile in ./emulator
