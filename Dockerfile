FROM openjdk:8

WORKDIR /app

EXPOSE 80

COPY . .

## enable mvnw executable and build with maven 
RUN chmod u+x ./mvnw && \
mkdir -p /opt/log && \
./mvnw clean package -Dmaven.test.skip=true

# Run jar after build
CMD ["java" ,"-jar","./target/web-0.0.1-SNAPSHOT.jar"]
