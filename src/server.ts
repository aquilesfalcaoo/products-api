import app from "./app";
import { Server } from "http";

const PORT = process.env.PORT || 3000;

let server: Server;

try {
  server = app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running on http://localhost:${PORT}/`);
  });
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error(`❌[server]: Error starting the server: `, error.message);
  } else {
    console.error(`❌[server]: Unknown error starting the server.`);
  }
  throw error;
}

export default server;
