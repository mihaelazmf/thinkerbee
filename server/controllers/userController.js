const UserModel = require("../models/users");

async function getAllUsers(req, res) {
  // Implementation to get all users
}

async function getUserById(req, res) {
  // Implementation to get a user by ID
}

async function createUser(req, res) {
  // Implementation to create a new user
}

async function updateUser(req, res) {
  // Implementation to update a user
}

async function deleteUser(req, res) {
  // Implementation to delete a user
}

async function getUser(req, res) {
  try {
    const userId = req.user?.id; // Assuming the decoded token contains the user ID

    if (!userId) {
      return res.status(401).json({ message: "User ID not found" });
    }

    // Retrieve the user based on the ID
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user object in the response
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUser, // Add the getUser function to the exports
};
