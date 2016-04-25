FROM node:argon

MAINTAINER Kuang-Ming Chen <kuangmingchen0702@gmail.com>

# Install Git
RUN apt-get update && apt-get install -y git

# Pull code from github
RUN git clone https://github.com/kmchen/airpot.git && \
    cd /airpot

# Install app dependencies
RUN npm install

EXPOSE 8080
CMD [ "npm", "start" ]
#CMD ["bash"]
