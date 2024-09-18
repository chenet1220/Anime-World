const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')

module.exports = {
  signup,
  login
}

async function signup(req, res) {
  console.log(req.body)
  try {
    const user = await User.create(req.body)
    console.log(user)
    const token = createJWT(user)
    console.log(token)
    res.json(token)
  } catch (err) {
    res.status(400).json({ message: 'Duplicate email' })
  }
}

async function login(req, res) {
  console.log('login')
  console.log(req.body)
  try {
    const user = await User.findOne({ email: req.body.email })
    console.log(user)
    if (!user) throw new Error()
    const match = await bcrypt.compare(req.body.password, user.password)
    if (!match) throw new Error()
    const token = createJWT(user)
    console.log(token)
    res.json(token)
  } catch (err) {
    res.status(400).json({ message: 'Bad Credentials' })
  }
}

/*--- Helper Functions ---*/

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  )
}

// const User = require('../models/user');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const register = async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ username, password: hashedPassword });
//     await user.save();
//     res.status(201).send('User registered successfully');
//   } catch (error) {
//     res.status(400).json({ message: 'Error registering user' });
//   }
// };

// const login = async (req, res) => {
//   const { username, password } = req.body;
//   const user = await User.findOne({ username });
//   if (!user) return res.status(400).send('User not found');

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return res.status(400).send('Invalid credentials');

//   const token = jwt.sign({ userId: user._id }, process.env.SECRET, { expiresIn: '1h' });
//   res.json({ token });
// };

// module.exports = { register, login }



