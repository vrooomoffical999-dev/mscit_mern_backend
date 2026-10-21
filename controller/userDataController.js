import userData from '../model/user.js';
import bcrypt from 'bcrypt';
import genrateToken from '../utils/jwtutils.js';
import cloudinary, { proxyAgent } from '../config/cloudinary.js';



const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'mscit_users', agent: proxyAgent },
      (error, result) => {
        if (error) return reject(error)
        resolve(result)
      }
    )
    stream.end(buffer)
  })
}

export const addUser = async (req, res) => {
  try {
    const password = await bcrypt.hash(req.body.password, 10);
	let imageUrl = ""
	if(req.file) {
		const result = await uploadToCloudinary(req.file.buffer)
		imageUrl = result.secure_url
	}

    const userDataval = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      password: password,
	  image:imageUrl

    };
    const saveUserData = await userData.create(userDataval);
    res.status(200).json({ message: "User Successfully Added ✅", data: saveUserData });
  } catch (error) {
    res.status(500).json({ errormessage: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const getuserData = await userData.find();
    res.status(200).json({ message: "User Get Successfully ✅", data: getuserData });
  } catch (error) {
    res.status(500).json({ errormessage: error.message });
  }
};

export const getSingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    const getsingleUserdata = await userData.findById(id);
    res.status(200).json({ message: "Single User Get Successfully ✅", data: getsingleUserdata });
  } catch (error) {
    res.status(500).json({ errormessage: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteUserData = await userData.findByIdAndDelete(id);
    res.status(200).json({ message: "User Deleted Successfully ✅", data: deleteUserData });
  } catch (error) {
    res.status(500).json({ errormessage: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = req.params.id; 
    const userDataval = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address
    };
    const updateUserData = await userData.findByIdAndUpdate(id, userDataval, { new: true, runValidators: true });
    res.status(200).json({ message: "User Update Successfully ✅", data: updateUserData });
  } catch (error) {
    res.status(500).json({ errormessage: error.message });
  }
};

export const loginuser = async (req, res) => {
  try {
    const uData = await userData.findOne({ email: req.body.email });
    if (!uData) {
      return res.status(200).json({ message: "User Not Found ❗", status: 0 });
    }

    const comparePassword = await bcrypt.compare(req.body.password, uData.password);
    console.log(comparePassword);

    if (comparePassword) {
      const token = await genrateToken(uData);
      // FIXED: Added return here to prevent executing the "Wrong Password" block below
      return res.status(200).json({ message: "User Found Successfully ✅", token, status: 1 });
    }
    
    res.status(200).json({ message: "Wrong Password ❌", status: 0 });
  } catch (error) {
    res.status(500).json({ errormessage: error.message });
  }
};
