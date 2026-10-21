import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
	name:{
		type:String,
		required:true,
		trim:true,     //space not allowed in name
	},
	email:{
		type:String,
		required:true,
		unique:true,		//same email is not allowed
		
	},
	phone:{
		type:String,
		required:false,
	},
	address:{
		type:String,
		required:false,
	},
	password:{
		type:String,
		required:true,
	},
	image:{
		type:String,
		required:false,
	}
},{
	timestamps:true,
	collection:'userData'
})

export default mongoose.model('userData',userSchema)