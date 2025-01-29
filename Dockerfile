FROM node:18-alpine
WORKDIR /app
ENV GENERATE_SOURCEMAP false
COPY package.json package-lock.json ./
COPY build /app/build
RUN npm install -g serve
CMD ["serve", "-s", "build"]
