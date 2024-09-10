# Lost and Found Application

> **_NOTE:_**  This project is still in progress, therefore its repository is not completed. The descriptions below outline the intended goals and features of the repository.

## Project Overview

The Lost and Found Application is designed to help users report and find lost items. The project consists of two main components: the client and the server. The client is built using React Native with Expo, and the server is built using Node.js and Express. The server also includes a database and is containerized using Docker. A main Docker Compose file is provided to orchestrate the services.

## Features

- Authentication
- User profile management
- Interactive map with a switch between lost and found items
- Button and page to add lost or found objects
- Detailed page for each added item
- List feed with various filters, defaulting to show the closest reported lost item (switchable to found)
- Admin control with moderation tools

## Usage

1. Register or log in to your account.
2. Post details about a lost item or search for found items.
3. Use the map to locate lost or found items.
4. Use the messaging feature to communicate with other users.
5. Admins can use moderation tools to manage the platform.

## Installation

### Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Git](https://git-scm.com/)
- [NodeJS](https://nodejs.org/en/)

### Client

1. Clone the repository:

    ```sh
    git clone https://github.com/yourusername/lost-and-found.git
    ```

2. Navigate to the client directory:

    ```sh
    cd lost-and-found/lost-and-found-client
    ```

3. Install dependencies:

    ```sh
    npm install
    ```

4. Start the application:

    ```sh
    npm start
    ```

### Server

1. Navigate to the server directory:

    ```sh
    cd lost-and-found/lost-and-found-server
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Start the server:

    ```sh
    npm start
    ```

### Docker

1. Ensure Docker is installed and running on your machine.
2. Navigate to the root directory of the project:

    ```sh
    cd ../
    ```

3. Build and start the services using Docker Compose:

    ```sh
    docker-compose up --build
    ```

## Contributing

1. Fork the repository.
2. Create a new branch:

    ```sh
    git checkout -b feature-branch
    ```

3. Make your changes and commit them:

    ```sh
    git commit -m "Add new feature"
    ```

4. Push to the branch:

    ```sh
    git push origin feature-branch
    ```

5. Open a pull request.

## License
This project is licensed under Apache-2.0 License. See the [LICENSE](LICENSE) file for details.