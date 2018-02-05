FROM java:7
EXPOSE 8080

VOLUME /tmp
ADD hd_station.jar /app.jar
RUN bash -c 'touch /app.jar'
ENTRYPOINT ["java","-jar","/app.jar"]
