# development
FROM node:20.16-alpine as development
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN VITE_BACKEND_DOMAIN=https://api.hangouts.localhost/api npm run build
CMD ["npm", "run", "dev"]

# production
FROM caddy:2.8.4-alpine as production
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=development /app/dist /srv