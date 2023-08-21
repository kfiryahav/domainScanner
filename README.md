# Domain Security and Identity Information System

This system is designed to provide comprehensive security and identity information about domains. 
By scanning domains at regular intervals and gathering relevant data from sources like VirusTotal and WHOIS, this system ensures in-depth domain analysis. 
The collected data is stored for future reference and analysis. 
The system also provides an asynchronous REST API for interacting with and managing domain information.

## Features

- **Asynchronous REST API**: The system offers two endpoints for domain information retrieval and analysis requests.
  - **Endpoint 1 GET**: Returns current information about a domain. If no information is available, the domain is added to the analysis list, and the user is instructed to check back later.
  - **Endpoint 2 POST**: Adds a domain to the analysis list for processing.

- **Data Collection**: The system collects the following information for each domain:
  - Information from VirusTotal.
  - Information from WHOIS.

- **Modular Design**: The system follows a modular design, with several services communicating effectively. This architecture enables scalability and long-term viability.

## Security Features
- **Joi Domain Validation**: We validate and sanitize input data using Joi to prevent vulnerabilities.
ー
* *XXE Attack Prevention**: Our API safeguards against XML External Entity attacks.
**Rate Limiting**: We implement rate limiting to ensure stable performance and prevent abuse.

- **Scheduling System**: The analysis interval is configurable and set to run once a month.

## Tech Stack

- **Language**: TypeScript (Node.js)
- **Database**: MongoDB Atlas
- **External APIs**: Utilizes APIs from VirusTotal, WHOIS.

## Setup

1. **Clone this repository** to your local machine.

2. **Navigate to the project directory**.

3. **Install the necessary dependencies** by running the following command: npm install

4. **Set up your environment variables**, including API keys for external services and database connection details.

5. **Run the system** using the following command: npm run start

### Run with Docker 

If you're familiar with Docker, you can quickly deploy the system using Docker Compose. 
Docker Compose simplifies the setup process by defining the necessary services and configurations in a single file. 
Here's how to get started:

 **Run Docker Compose**: Use the following command to start the containers defined in the `docker-compose.yml` file:

This command will initiate the download of necessary Docker images and launch the containers as per the configuration. You'll see logs indicating the progress of the setup.

**Access the Application**: Once the containers are up and running, you can access the application by opening a web browser and navigating to the appropriate URL, typically `http://localhost:3000`.

**Stopping Containers**: To stop the containers, you can press `Ctrl + C` in the terminal where the `docker-compose up` command was executed. This will gracefully stop and remove the containers while preserving data. Alternatively, you can run the following command in the same directory:

## Database Configuration Options

You have the flexibility to choose to configure the database connection for this project with mongoDB as well:

**MongoDB Atlas:**

1. Create a MongoDB Atlas account and set up a database.

2. Update the necessary environment variables, including the MongoDB Atlas connection URI, in your `.env` file.

3. Uncomment the database connection code in your application files.

4. Follow the deployment instructions provided in this README to set up the system with the chosen configuration.

## Configuration Instructions

To properly set up and run this project, you'll need to configure your environment variables by creating a `.env` file in the root directory of the project. 
Follow these steps to configure the required API keys:

1. **Create `.env` File:**
   In the root directory of the project, create a file named `.env`.

2. **Add API Key Variables:**
   Inside the `.env` file, add the following lines, replacing `YOUR_WHOIS_API_KEY` and `YOUR_VIRUSTOTAL_API_KEY` with your actual API keys:

   ```plaintext
   WHOIS_API_KEY=YOUR_WHOIS_API_KEY
   VIRUSTOTAL_API_KEY=YOUR_VIRUSTOTAL_API_KEY
