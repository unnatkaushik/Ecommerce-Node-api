import app from "./src/app.js";
import connectDB from "./src/db/index.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server is running on port 5008");
    });
  })
  .catch((err) => {
    console.log(err);
  });
