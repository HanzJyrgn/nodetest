# nodetest
## Docker
- build with docker

    `docker build -f Dockerfile -t mycontainer .`
- run with docker

    `docker run -p 8000:8000 -it --init mycontainer`