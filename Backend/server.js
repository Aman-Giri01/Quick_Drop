import app from "./app.js";
import { connectDB } from "./src/config/db.js";

await connectDB()
  .then(() => {
    app.listen(process.env.PORT, (err) => {
      if (err) {
        console.log(err);
        console.log(`Error while starting the server`);
        process.exit(1);
      } else console.log(`Server running at port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Error while connecting to database`);
    console.log(err);
    process.exit(1);
  });