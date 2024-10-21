#!/bin/sh

echo "Generating a self-signed certificate for your local development server"

openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout certs/self-signed.key -out certs/self-signed.crt

echo "Self-signed certificate created in certs/self-signed.crt with key in certs/self-signed.key"
echo "Do NOT use these in production or commit your certs to source control"