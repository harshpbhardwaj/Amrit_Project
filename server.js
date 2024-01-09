const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Connecting to mogodb
const datbaseUrl = 'mongodb+srv://adwarkenway:wItZFT6Nny6JVOyX@temp-app.ccq1dlr.mongodb.net/user-comment?retryWrites=true&w=majority';
mongoose.connect(datbaseUrl)
        .then(() => {
            console.log('mongodb is connected');
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB:', error);
        });

// Schema for user's comments
const userSchema = new mongoose.Schema({
  name: String,
  comments: String,
});

// Modal for user
const User = mongoose.model('User', userSchema);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());

// new harsh
app.get('/', (req, res) => {
    res.send('<h1>Welcome to User Comment Server!</h1>')
})
// end new harsh

// Route for post data
app.post('/api/users', async (req, res) => {
    try {
      const { name, comments } = req.body;
      const newUser = new User({ name, comments });
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

//   Route for get data
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
