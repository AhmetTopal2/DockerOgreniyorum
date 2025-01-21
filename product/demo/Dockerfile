# Temel image olarak OpenJDK 21 kullanılıyor
FROM openjdk:21-jdk-slim

# Uygulamanın JAR dosyasını konteyner içine kopyalayın
COPY target/demo-0.0.1-SNAPSHOT.jar /app/demo.jar

# Çalışma dizinini belirleyin
WORKDIR /app

# Uygulamanın çalıştırılacağı komut
ENTRYPOINT ["java", "-jar", "demo.jar"]
