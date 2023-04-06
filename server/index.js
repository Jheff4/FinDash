import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

// CONFIGURATION 

// reads the .env file in the root directory of your application 
// and loads the environment variables into process.env
dotenv.config();

const app = express();

// enable parsing of JSON data in incoming requests
app.use(express.json());

// secures app by setting various HTTP headers
app.use(helmet());

// cross origin sharing request
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// middleware for logging HTTP requests and responses
app.use(morgan("common"));

// The body-parser middleware will parse the JSON request
// body and make the resulting JSON object available in 
//req.body property of the request object for further processing
app.use(bodyParser.json()); // app.use(express.json());

// which means that the parser will only parse 
// key-value pairs in the URL-encoded data
app.use(bodyParser.urlencoded({ extended: false }));

// enables cross-origin requests from different domains
app.use(cors());

// ROUTES
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

// MONGOOSE SETUP
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`))
  })
  .catch((err) => console.log(`${err} did not connect`));
