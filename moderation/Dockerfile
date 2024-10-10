FROM node:20

WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . . 
EXPOSE 4003

CMD ["npm" , "start"]