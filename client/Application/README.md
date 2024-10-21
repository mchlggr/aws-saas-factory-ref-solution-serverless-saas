# Application

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.5.

## Generating Local SSL Certificates
Open `cd ./clients/certs` and run `./generate-local-certs.sh` to generate a self-signed SSL certificate for your local development server.
This will create a self-signed certificate self-signed.crt and a corresponding private key self-signed.key in a directory named certs.

***Important Notes:***

- ***Do NOT use these certificates in production. Self-signed certificates are intended for development purposes only.***
- ***Avoid committing the certificates to source control for security reasons.***


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
