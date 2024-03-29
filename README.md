# NASA Project

## Features

- **Express.js Backend**: The server-side logic is implemented using Express.js, following the MVC (Model-View-Controller) architecture for a well-organized and maintainable codebase.
- **React Frontend**: The user interface is built with React, offering a dynamic and responsive user experience with reusable components and efficient state management.
- **Dockerization**: The project includes a Dockerfile for containerization, allowing for easy deployment and scalability in diverse environments.
- **CI/CD with GitHub Actions**: Continuous Integration and Continuous Deployment (CI/CD) pipelines are set up using GitHub Actions, ensuring automated testing and seamless deployment workflows.
- **MongoDB Database**: MongoDB, a NoSQL database, is utilized for efficient and flexible data storage, enabling rapid development and scalability for data-intensive applications.
- **NASA API Integration**: Real-time data on planets is accessed through the NASA API, providing valuable information and enriching the application's functionality.
- **Logging with Morgan**: The application utilizes the Morgan middleware to generate detailed logs, facilitating monitoring, debugging, and performance optimization.

## Project Structure

- The server-side code is stored in the `server` folder, implementing the backend logic with Express.js and interacting with the MongoDB database.
- The client-side code is located in the `client` folder, containing the React components and frontend assets for the user interface.
- Dockerfile: The Dockerfile in the project root enables containerization of the application for easy deployment and management.

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the `server` folder and install backend dependencies with `npm install`.
3. Set up the MongoDB database and configure connection details in the server environment variables.
4. Navigate to the `client` folder and install frontend dependencies with `npm install`.
5. Launch the backend server by running `npm start` in the `server` folder.
6. Launch the frontend client by running `npm start` in the `client` folder.
7. Access the application in your web browser at the specified port.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
