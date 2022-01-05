FROM node:alpine

WORKDIR /app
COPY package.json ./
COPY tsconfig*.json ./
RUN npm install
COPY . ./
RUN npx tsc 
#RUN npm run build
# RUN apt-get update && apt-get install -y wget

# ENV DOCKERIZE_VERSION v0.6.1
# RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
#     && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
#     && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

#EXPOSE 3000 80
#CMD ["node", "dist/app.js"]
