# Builds the docker image and pushes it to the GCP container registry
docker build -t shoepv1:v1 .
docker tag shoepv1:v1 gcr.io/shoep-gcr/shoepv1:v1
docker push gcr.io/shoep-gcr/shoepv1:v1