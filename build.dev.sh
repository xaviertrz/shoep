# Builds the docker image and pushes it to the GCP container registry
docker build -t shoepv1:v1 .
docker image list # Extraer id imagen
docker run -it -p 8080:8080 <id_imagen>