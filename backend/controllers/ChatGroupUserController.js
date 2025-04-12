const prisma = require("../configurations/db");

const getAllUserDetails = async (req, res) => {
  try {
    const { group_id } = req.query;

    if (!group_id) {
      return res.status(400).json({ message: "group_id is required" });
    }

    const users = await prisma.groupUsers.findMany({
      where: {
        group_id: group_id,
      },
    });

    return res.status(200).json({ message: "Data fetched successfully", data: users });
  } catch (err) {
    console.error("Error fetching users:", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const addUserDetails = async (req, res) => {
  try {
    const { name, group_id } = req.body;

    if (!name || !group_id) {
      return res.status(400).json({ message: "name and group_id are required" });
    }

    const newUser = await prisma.groupUsers.create({
      data: { name, group_id },
    });

    return res.status(201).json({ message: "User added successfully", data: newUser });
  } catch (err) {
    console.error("Error adding user:", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {getAllUserDetails,addUserDetails};
