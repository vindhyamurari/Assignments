import express from "express";
import cors from "cors";
import connectionToDB from "./models/connection";
import dotenv from "dotenv";
import {userRouter} from './routes/userRoute'
import {questionRouter} from './routes/questionRoute'
import {answerRouter} from './routes/answerRoute'


dotenv.config();

const runServer = () => {
	const app = express();

	app.use(express.json());

	app.use(cors());

    app.use('/api/users',userRouter)
	app.use('/api/questions',questionRouter)
	app.use('/api/answers',answerRouter)

	connectionToDB()
		.then(() => {
			console.log("Connected to database");

            const port=5000;

			app.listen(port, () => {
				console.log(`Server Running at http://localhost:${port}`);
			});
		})
		.catch((err: any) => {
			console.log(err.message);
		});
};

runServer();