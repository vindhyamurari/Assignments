import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectionToDB = () => {
	return mongoose.connect(
		`mongodb+srv://${process.env.mongo_user}:${process.env.mongo_pwd}@${process.env.server_name}/${process.env.database_name}?retryWrites=true&w=majority`,
		{
			useFindAndModify: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	);
};

export default connectionToDB;