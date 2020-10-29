FROM node:alpine as prod

# The EXPOSE instruction does not actually publish the port. It's a documentation for other images or engineers
EXPOSE 5000

# For a proper node server shutdown, in case we don't have the app's source code to write a snipet
# But I guess it is deprecated, as I notice a gracefull shutdown even without this, and index.js SIG.. listeners
# RUN apk add --no-cache tini

WORKDIR /usr/src/app

COPY package.json .
#COPY package.json package-lock.json* ./

#RUN npm install --only=prod
RUN npm install --only=prod && npm cache clean --force

COPY . .

# also we can play around the linux current user, to have more secure enviroment

#See the line 6
#ENTRYPOINT ["/sbin/tini", "--"]
#CMD ["node", "./bin/www"]

# for the production use allways "node index" or "node ./bin/www", not npm start
CMD ["npm", "start"]

# official node guide
# https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

FROM prod as dev
ENV NODE_ENV=development
RUN npm install --only=development
CMD ["npm", "start"]

FROM dev as test
ENV NODE_ENV=development
CMD ["npm", "test"]

FROM dev as ci
ENV NODE_ENV=development
CMD ["npm", "run" ,"test:ci"]