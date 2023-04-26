# kickups

How long can you keep it up?

## Play

[kickups.fly.dev](https://kickups.fly.dev)

## Prerequisites

-   [Node.js](https://nodejs.org/en/download/)
-   [Visual Studio Code](https://code.visualstudio.com/download)
-   [Visual Studio Code Docker Extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)
-   [Docker Desktop](https://www.docker.com/)

## Setup

-   Clone repo and open in VS Code
-   Install yarn: `npm i -g yarn`
-   Install package dependencies: `yarn`
-   Launch Docker Desktop. In VS Code, right-click `.kickups-dev-container\docker-compose.yml` and select `Compose Up` to initialize database container.
-   Press `F5` or run `yarn dev` to run in dev mode (server and client restart on file save)
-   Client will be served on [localhost:3000](http://localhost:3000/)

## Technologies

-   [MongoDB](https://www.mongodb.com/)
-   [Express](http://expressjs.com/)
-   [React](https://reactjs.org/)
-   [Node.js](https://nodejs.org/en/)
-   [Socket.IO](https://socket.io/)
-   [Webpack](https://webpack.js.org/)
-   [Babel](https://babeljs.io/)
-   [TypeScript](https://www.typescriptlang.org/)
