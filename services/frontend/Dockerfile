FROM nginx:1.21-alpine
RUN apk add nodejs
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY ./build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
