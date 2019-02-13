FROM node:8.9.4
ARG branchName

WORKDIR /usr/src/app
COPY . .
RUN mkdir -p /usr/src/logs
RUN npm i npm@latest -g
RUN npm install
ENV NODE_ENV=$branchName
RUN npm run build
EXPOSE 3000
CMD ["node", "server/index.js"]



