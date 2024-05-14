FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app
COPY . .

# Backend building
RUN rm -rf node_modules
RUN npm install
RUN npm run build

# Frontend building
RUN cd client
RUN rm -rf node_modules
RUN npm install
RUN npm run build


# Expose port
EXPOSE 8080

CMD ["npm", "start"]