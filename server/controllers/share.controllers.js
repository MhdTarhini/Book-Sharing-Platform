const User = require("../models/users.model");

const share = async (req, res) => {
  console.log(req.body);
  try {
    const { userId, title, author, review, genre, pic_url } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newBookPost = {
      title,
      author,
      review,
      genre,
      pic_url,
      likes: [],
    };

    user.posts.push(newBookPost);

    await user.save();

    res.status(201).json({ message: "Book post added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { share };
