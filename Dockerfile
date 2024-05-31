# Build stage
FROM maven:3.6.3-openjdk-8 AS build

WORKDIR /app

# Copy the Maven wrapper and the pom file
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Ensure the Maven wrapper is executable
RUN chmod +x mvnw

# Download dependencies
RUN ./mvnw dependency:go-offline

# Copy the rest of the application source code
COPY src ./src

# Build the application
RUN ./mvnw clean package -DskipTests

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
