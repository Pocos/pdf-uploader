FROM node:14.5 as builder

## Install build toolchain, install node deps and compile native add-ons
#RUN apk add --no-cache --virtual .gyp python make g++
#RUN npm install [ your npm dependencies here ]
COPY package*.json /

RUN npm ci --production

FROM node:14.5 as app

## Copy built node modules and binaries without including the toolchain
COPY --from=builder node_modules /app/node_modules

# Remove for production build
RUN npm install -g nodemon

# Install graphics magick
RUN apt-get update && apt-get install -y graphicsmagick

COPY . /app

WORKDIR /app

USER node

#ENV TEMP_FILE_PATH

#HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD curl --fail http://localhost:3000/ || exit 1

CMD ["nodemon","server.js"]