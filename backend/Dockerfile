FROM node:12.13.0-alpine AS alpine

WORKDIR /app

COPY package.json .

RUN npm install 

COPY . .
RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "dist:start"]
