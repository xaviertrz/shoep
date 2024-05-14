# Builds the docker image and pushes it to the GCP container registry
envsubst < app.base.yaml > app.yaml

gcloud builds submit --region=us-central1 --tag us-central1-docker.pkg.dev/winter-field-422515-r6/shoep-repo-gcr/shoepv1:v1

gcloud app deploy --image-url=us-central1-docker.pkg.dev/winter-field-422515-r6/shoep-repo-gcr/shoepv1:v1