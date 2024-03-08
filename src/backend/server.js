import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const port = parseInt(process.env.PORT, 10) || process.env.API_PORT;

app.listen(port, () => {
  console.log(`Backend api available at ${process.env.API_PATH}`);
});
