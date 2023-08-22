const User = require("../models/users.model");
const Follow = require("../models/follow.model");

const share = async (req, res) => {
  try {
    const { userId, title, author, review, genre, pic_url } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (pic_url === null) {
      return res.json({ message: "image is required" });
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
    res.status(500).json({ message: "failed" });
  }
};

const getPost = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userPosts = user.posts.map((post) => ({
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        userId: user._id,
      },
      post: post,
    }));

    const followedUsers = await Follow.find({ follower: id });

    const followedUsersData = [];
    for (const follow of followedUsers) {
      const followedUser = await User.findById(follow.following);
      followedUsersData.push(
        ...followedUser.posts.map((post) => ({
          user: {
            firstName: followedUser.firstName,
            lastName: followedUser.lastName,
            userId: followedUser._id,
          },
          post: post,
        }))
      );
    }

    const allPosts = userPosts.concat(...followedUsersData);
    allPosts.sort((a, b) => b.post.createdAt - a.post.createdAt);
    res.json({ data: allPosts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};

module.exports = { share, getPost };

