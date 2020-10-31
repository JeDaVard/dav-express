FROM node:alpine as base

# The EXPOSE instruction does not actually publish the port. It's a documentation for other images or engineers
EXPOSE 5000

# tini is something to help to transfer linux signals to node, but I guess it comes even without tini
# RUN apk add --no-cache tini

WORKDIR /usr/src/app
COPY package.json .
RUN npm install --only=prod && npm cache clean --force
COPY . .

#See the line 6
#ENTRYPOINT ["/sbin/tini", "--"]
#CMD ["node", "./bin/www"]


# To use multistage feature, for the main image use this command
# docker build -t <tagName> --target prod .
# for the others
# docker build -t <tagName>:<targetName> --target <targetName> .
FROM base as prod
ENV NODE_ENV=production
# also we can play around the linux current user, to have more secure enviroment
# for the production use allways "node index" or "node ./bin/www", not npm start
CMD ["npm", "start"]

FROM base as dev
ENV NODE_ENV=development
RUN npm install --only=development
CMD ["npm", "start"]

FROM dev as test
ENV NODE_ENV=development
CMD ["npm", "test"]

FROM dev as ci
ENV NODE_ENV=development
CMD ["npm", "run" ,"test:ci"]

# official node guide
# https://nodejs.org/en/docs/guides/nodejs-docker-webapp/