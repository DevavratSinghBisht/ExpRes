# ExpRes: Where Expression Meets Resilience
ExpRes is a decentralized, blockchain-based social media platform leveraging ResilientDB for fault-tolerant data storage, secure identity verification, and transparent content governance, combined with privacy-preserving machine learning for personalized user experiences.
## For connecting to MongoDB docker.

1. Download docker desktop app
2. Run the command `docker run -d --name mongo -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=root -p 27017:27017 -v mongodemo:/data/db mongo`. It will pull the docker image and start the container.

## For running the backend app locally.

1. Use a terminal to `cd backend` in the repo.
2. Install the dependencies using `requirements.txt`.
3. Run `uvicorn main:app --reload`
4. Backend should be available at `localhost:8000` and the swagger documentation can be seen at `localhost:8000/docs`

## For running the frontend app locally.
1. Use a terminal to `cd frontend` in the repo.
2. Install the dependencies using `npm install`.
3. Run `npm build` and then `npm start`
4. Backend should be available at `localhost:3000`.
