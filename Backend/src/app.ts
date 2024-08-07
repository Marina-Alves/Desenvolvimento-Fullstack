import express, {json} from "express";
import dotenv from "dotenv"
import cors from "cors"
import router from "./routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(json());
app.use(router);

const port = process.env.SERVER_PORT || 5000;
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});