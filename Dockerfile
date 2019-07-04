FROM node:10.16.0

WORKDIR /usr/src/api

COPY ./ ./

RUN npm install -g nodemon
RUN npm install

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.5.0/wait /wait
RUN chmod +x /wait

CMD ["/bin/bash"]