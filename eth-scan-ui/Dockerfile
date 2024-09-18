# Step 1: Build the application
FROM node:22.6-alpine AS builder

# Set the working directory in the container
WORKDIR /app

# Set the environment variables
ARG PUBLIC_API_URL
ENV PUBLIC_API_URL $PUBLIC_API_URL
ARG PUBLIC_API_WS_URL
ENV PUBLIC_API_WS_URL $PUBLIC_API_WS_URL

# Copy all the application files to the container
COPY . /app

# Run your build process
RUN npm i --force
RUN npm run build

# Step 2: Create a smaller image for running the application
FROM node:22.6-alpine

# Copy only the necessary files from the builder image to the final image
COPY --from=builder /app/package*.json  /app/
COPY --from=builder /app/build  /app/build/
COPY --from=builder /app/node_modules  /app/node_modules/

# set work dir as app
WORKDIR /app

# Expose the port the application will run on
EXPOSE 3000

#Start the Node server
CMD ["node","build"]
# You can debug the contents of the dockerfile with this
# ENTRYPOINT ["tail", "-f", "/dev/null"]
