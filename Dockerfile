FROM httpd:2.4
COPY ./dist/shortie/ /usr/local/apache2/htdocs/
