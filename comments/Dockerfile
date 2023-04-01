# specify base image
FROM node:alpine

# set the working directory to /app in the container. All of the commands will be issued relative to this directory
WORKDIR /app

# copy over only the package.json file
COPY ./package.json ./

# install all dependencies
RUN npm install 

# copy over all of your remaining source code
COPY ./ ./

# set the command to run when the container starts up
CMD ["npm", "start"]
