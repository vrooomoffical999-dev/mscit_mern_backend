import mongoose from "mongoose";

const connectDb = async () =>{			//async = multiple request at one time
	try{
		const uri = process.env.USE_PROXY === 'true'
			? process.env.MONGODB_URI_PROXY
			: process.env.MONGODB_URI
        const conn = await mongoose.connect(uri)  // database name is written inside before ?ssl
		console.log(`Database successfully connected:${conn.connection.host}`)
	}catch(error){
		console.log(`connection error :${error.message}`)
	}
}

export default connectDb