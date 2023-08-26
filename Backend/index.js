import 'dotenv/config';
import express from "express";
import bodyParser from "body-parser";
import _ from "lodash";
import blogRoute from "./routes/blog.js";
import authRoute from "./routes/auth.js";
import connectToMongo from "./db.js";
import cors from "cors";

const app = express();
app.locals._ = _;

connectToMongo();

app.use(express.static("public"));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/v1/blogs", blogRoute);
app.use("/api/v1/auth", authRoute);


app.listen(process.env.PORT, () => {
  console.log(`Server started listening at http://localhost:${process.env.PORT}`);
})