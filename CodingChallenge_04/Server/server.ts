import express from "express";
import cors from "cors";
import connectionToDB from "./models/connection";
import dotenv from "dotenv";
import UserRoute from './routes/userRoute'
import MovieRoute from './routes/movieRoutes'

const runServer = () => {
	const app = express();
	dotenv.config();
	app.use(express.json());

	app.use(cors());
	const userRouter=UserRoute();
	const movieRouter=MovieRoute();

    app.use('/api/users',userRouter)
	app.use('/api/movies',movieRouter)



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