import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectionToDB = () => {
	return mongoose.connect(
		`mongodb+srv://${process.env.mongo_user}:${process.env.mongo_pwd}@${process.env.server_name}/${process.env.database_name}?retryWrites=true&w=majority`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: true,
		}
	);
};

export default connectionToDB;