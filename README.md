# microservice-social-media

## Steps to run the application:
1) Clone the Github repository.
2) Open the terminal and type <code>cd microservice-social-media</code>.
3) Type <code>npm install</code>.
4) create a <code>.env</code> file and add the details sent to you, without any spaces.
5) Type <code>npm start</code>.

## Infrastructure and Scaling write-up
### High level overview of the project:
**Post Creation (POST /api/v1/posts/):**
- Accepts a JSON payload with text content and a unique identifier.
- Validates and processes incoming data, ensuring the integrity of the post creation process.

**Analysis Endpoint (GET /api/v1/posts/{id}/analysis/):**
- Provides an analysis endpoint for a specific post identified by {id}.
- Analyzes the content to calculate the number of words and average word length.
- Returns the analysis results as a JSON response.

### Rate-limiting of Requests:
- Implemented a rate limiter for the endpoints to control the number of incoming GET and POST requests.
- Added a limit of 150 requests per 10 minutes of time period.

### Caching Mechanism:
- Utilized Redis for caching frequently accessed data, reducing response times and database load.
- Implemented caching strategies to store and retrieve data efficiently, enhancing overall system performance.

## Assumptions made during assignment:
- Assuming the mongodb is connected and redis server is running while testing the application.
- Added the average length of words rounded to max of 2 decimal places.
- Added the requests limit of upto 150 requests for 10 mins of time interval.
