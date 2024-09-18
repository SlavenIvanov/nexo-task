FROM node:22.6-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the rest of the application code
COPY . .

# Install dependencies
RUN npm install

# Expose the port the app runs on
EXPOSE 3003

# Start the application
CMD ["npm", "start"]
# # You can debug the contents of the dockerfile with this
# ENTRYPOINT ["tail", "-f", "/dev/null"]
