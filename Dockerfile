# Stage 1 - Build the App
FROM node:14.17.6-alpine as git_search_portal
LABEL maintainer="nikhilbharathwaj@gmail.com"
WORKDIR /git_search
ENV PATH /git_search/node_modules/.bin:$PATH
COPY . ./
RUN npm install
RUN npm run build

# stage 2 - Build the Final Image using Nginx
FROM nginx:1.17.8-alpine
LABEL maintainer="nikhilbharathwaj@gmail.com"
COPY --from=git_search_portal /git_search/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8000
CMD ["nginx", "-g", "daemon off;"]
