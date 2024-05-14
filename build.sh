# Builds the docker image and pushes it to the GCP container registry
envsubst < app.base.yaml > app.yaml

npm install 
npm run build

cd client
npm install
npm run build

cd ..
gcloud app deploy
