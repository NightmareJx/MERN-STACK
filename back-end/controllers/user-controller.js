const User = require("../modules/user-module");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const { use } = require("../routes/workout");

// creating token function
const Create_Token = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "2d" });
};

// login user

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "All fields must be filled" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Email is not valid" });
    } 
    
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "This Email does not exist" });
    }

    const match = await bcrypt.compare(password, user.password);

    const username = user.username;

    if (!match) {
      return res.status(400).json({ error: "Invalid Password" });
    } else {
      const token = Create_Token(user._id);
      return res.status(200).json({ username, token });
    }
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// signup user

const signeupUser = async (req, res) => {
  // taking the email and password from req body
  const { username, email, password } = req.body;

  // checking if the email and password is set

  if (!email || !password || !username) {
    return res.status(400).json({ error: "All fields must be filled" });
  }

  // Check if username is valid
  if (!validator.isAlphanumeric(username)) {
    return res.status(400).json({ error: "Username must be alphanumeric" });
  }

  // Check username length
  if (!validator.isLength(username, { min: 3, max: 20 })) {
    return res
      .status(400)
      .json({ error: "Username must be between 3 and 20 characters" });
  }

  // email validation

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Email is not valid" });
  }

  // password validation

  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({ error: "Password not strong enough" });
  }

  // find if exists and manage the error
  const exists = await User.findOne({ email });

  if (exists) {
    return res.status(400).json({ error: "This Email Already Exists" });
  }

  // find if username is used 
  const Used_Username = await User.findOne({ username }) 

  if(Used_Username) {
    return res.status(400).json({ error: "This Username Already Used" });
  }

  // securing password by bcrypt salt to generate a random password before the hashsed password an then we hash it
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  //try to create the user and err management

  try {
    const user = await User.create({ username , email, password: hash });

    // create a token
    const token = Create_Token(user._id);

    return res.status(200).json({ username, token });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = {
  loginUser,
  signeupUser,
};
