npm run build
docker build -t crm-web .
docker run -it -p 8082:80 --rm --name crm-web crm-web