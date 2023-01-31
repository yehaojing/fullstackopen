# The first FROM is now a stage called build-stage
FROM node:16 AS test-stage
WORKDIR /usr/src/app

COPY . .

RUN npm ci --force

RUN REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL npm run build

RUN npm install -g serve

CMD ["serve", "-s", "build", "-p", "3000"]