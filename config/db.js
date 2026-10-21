import mongoose from "mongoose";

const connectDb = async () =>{			//async = multiple request at one time
	try{
        const conn = await mongoose.connect("mongodb://khushigadani26_db_user:Ilx1IUqZbf8szE2Y@ac-cffqjew-shard-00-00.6jffp7i.mongodb.net:27017,ac-cffqjew-shard-00-01.6jffp7i.mongodb.net:27017,ac-cffqjew-shard-00-02.6jffp7i.mongodb.net:27017/?ssl=true&replicaSet=atlas-14hil7-shard-0&authSource=admin&appName=Cluster0&proxyHost=127.0.0.1&proxyPort=1080")  // database name is written inside before ?ssl
		console.log(`Database successfully connected:${conn.connection.host}`)
	}catch(error){
		console.log(`connection error :${error.message}`)
	}
}

export default connectDb