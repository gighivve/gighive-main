import App from "./app";
import config from "./config/config";
import 'dotenv/config'

const server = new App();
server.listen(config.port);
