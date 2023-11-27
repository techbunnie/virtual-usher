FROM node:21-alpine

RUN npm install -g pnpm

WORKDIR /opt/alfred

COPY "./node_modules"  "./node_modules"
COPY "./public"         "./public"
COPY "./src"            "./src"
COPY "./package.json"   "./package.json"
COPY "./pnpm-lock.yaml" "./pnpm-lock.yaml"

EXPOSE 3000

CMD ["npm", "run", "lite"]
