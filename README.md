# Docker run web server
> docker run -i -t -p 8080:8080 -e MONGOD_IP=<IP> docker/repo /bin/bash

### Running mongo server ###
> docker run -p 27017:27017 --name some_name -d docker/repo
