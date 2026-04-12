import * as dotenv from "dotenv";
dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
}

const config: Config = {
  port: 8080,
  nodeEnv: "development",
};

export default config;