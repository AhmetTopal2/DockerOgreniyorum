# Build stage
FROM maven:3.9.9-eclipse-temurin-17-alpine AS builder

# Çalışma dizinini ayarla
WORKDIR /app

# Önce sadece pom.xml'i kopyala ve bağımlılıkları indir
COPY pom.xml .
COPY .mvn .mvn
COPY mvnw .
COPY mvnw.cmd .
RUN mvn dependency:go-offline

# Kaynak kodları kopyala ve build et
COPY src src
RUN mvn package -DskipTests

# Runtime stage
FROM eclipse-temurin:17-jre-alpine

# Uygulama için kullanıcı oluştur
RUN addgroup -S spring && adduser -S spring -G spring

# Çalışma dizinini ayarla ve kullanıcıyı değiştir
WORKDIR /app
USER spring:spring

# Builder aşamasından JAR dosyasını kopyala
COPY --from=builder /app/target/*.jar app.jar

# Ortam değişkenlerini tanımla
ENV SPRING_PROFILES_ACTIVE=prod
ENV JAVA_OPTS="-Xms512m -Xmx512m"

# Container sağlık kontrolü için
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -q --spider http://localhost:8080/actuator/health || exit 1

# Uygulamayı çalıştır
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]

# Port tanımla
EXPOSE 8080 