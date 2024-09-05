# development
FROM node:20.16-alpine as development
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
CMD ["npm", "run", "dev"]

# production
# --only-production -> installs only dependencies(not devDeps)
FROM node:20.16-alpine as production
WORKDIR /app
COPY package*.json .
RUN npm ci --only=production
COPY . .
CMD ["npm", "run", "start"]