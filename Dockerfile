# etapa de producción
# FROM nginx:1.13.12-alpine as production-stage
# COPY /dist/ /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

FROM httpd:2.4
COPY /dist/ /usr/local/apache2/htdocs/