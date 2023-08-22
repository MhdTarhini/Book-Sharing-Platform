const Follow = require("../models/follow.model");

const followUser = async (req, res) => {
  const { followerId, followingId } = req.body;

  try {
    const existingFollow = await Follow.findOne({
      follower: followerId,
      following: followingId,
    });

    if (existingFollow) {
      return res
        .status(400)
        .json({ message: "Follow relationship already exists" });
    }

    const newFollow = new Follow({
      follower: followerId,
      following: followingId,
    });

    await newFollow.save();

    res
      .status(201)
      .json({ message: "Follow relationship created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const unfollowUser = async (req, res) => {
  const { followerId, followingId } = req.body;

  try {
    const existFollow = await Follow.findOne({
      follower: followerId,
      following: followingId,
    });

    if (!existFollow) {
      return res.status(400).json({ message: "Follow does not exist" });
    }

    await existFollow.remove();

    res.status(200).json({ message: "Follow removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "failed" });
  }
};

module.exports = { followUser, unfollowUser };
