FROM       ubuntu:latest

MAINTAINER Kuang-Ming Chen <kuangmingchen0702@gmail.com>

# Installation:
# Import MongoDB public GPG key AND create a MongoDB list file
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
RUN echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.0.list

# Update apt-get sources AND install MongoDB
RUN apt-get update && apt-get install -y mongodb-org wget nano

# Create the MongoDB data directory
RUN mkdir -p /data/db

# Download latest airport review data
RUN wget https://raw.githubusercontent.com/quankiquanki/skytrax-reviews-dataset/master/data/airport.csv

# Download airport review data import script
RUN wget https://raw.githubusercontent.com/kmchen/airpot/master/vendor/dataImport.sh

RUN chmod 777 dataImport.sh

# Expose port 27017 from the container to the host
EXPOSE 27017

# Import airport-review data
RUN /bin/bash -c "/usr/bin/mongod &" && \
    /bin/bash -c "source dataImport.sh"

# Set usr/bin/mongod as the dockerized entry-point application
ENTRYPOINT ["/usr/bin/mongod"]
