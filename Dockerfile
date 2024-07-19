# FROM node:18 as base
# WORKDIR /usr/src/fiap-fase3-app
# COPY ./package.json .
# COPY prisma ./prisma/
# RUN npm i && npm i -g typescript

# FROM base as build
# WORKDIR /usr/src/fiap-fase3-app
# COPY . .
# COPY --from=base /usr/src/fiap-fase3-app/node_modules ./node_modules
# COPY --from=base /usr/src/fiap-fase3-app/prisma ./prisma
# RUN tsc

# FROM base as prod
# WORKDIR /usr/src/fiap-fase3-app
# COPY --from=build /usr/src/fiap-fase3-app/dist ./dist
# COPY --from=build /usr/src/fiap-fase3-app/prisma ./prisma
<<<<<<< HEAD
# ENV DATABASE_URL=mysql://root:root@db:3307/payment_db
# CMD ["node", "dist/main/server.js"]

FROM node:18
WORKDIR /usr/src/backend-payment
=======
# ENV DATABASE_URL=mysql://root:root@db:3307/orders_db
# CMD ["node", "dist/main/server.js"]

FROM node:18
WORKDIR /usr/src/backend-orders
>>>>>>> 51a0ba0700d0d7a3e3aa8d0883a357cce7d368ad
COPY backend-orders/package*.json ./
RUN npm i
COPY backend-orders/ .
RUN npm run build
RUN npx prisma generate
<<<<<<< HEAD
ENV DATABASE_URL=mysql://root:root@payment_db:3306/payment_db
=======
ENV DATABASE_URL=mysql://root:root@db:3306/db
>>>>>>> 51a0ba0700d0d7a3e3aa8d0883a357cce7d368ad
RUN chmod +x ./start.sh
# CMD ["node", "dist/main/server.js"]
CMD ["./start.sh"]