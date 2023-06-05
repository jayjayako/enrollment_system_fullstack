FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000

EXPOSE 3000

# RUN bash node.sh

# CMD ["bash","node.sh"]

# note replace devstart with actual start command and replace nodemon
# with node to run in production
CMD ["npm","run","devstart"]