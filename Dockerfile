# Build stage
FROM openjdk:8-jdk-slim AS build

WORKDIR /app

# Copy the source code here
# Copy the source code to the container
COPY . .

# Debugging information
RUN ./mvnw --version \
    && ./mvnw clean package -Dmaven.test.skip=true
    
# Run stage
FROM openjdk:8-jre

WORKDIR /app

# Copy the JAR file from the build stage
COPY --from=build /app/target/web-0.0.1-SNAPSHOT.jar web.jar

# Expose the application port
EXPOSE 80

# Build argument for Google API key
ARG GOOGLE_CALENDAR_APIKEY

# Set environment variable in the container
ENV API_KEY=${GOOGLE_CALENDAR_APIKEY}
ENV WEB_ENV=prod

# Run the application
CMD ["java", "-jar", "web.jar"]
