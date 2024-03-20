const User = require('../models/user');


exports.getAllUsers = async (req, res) => {
    try {

        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createUsers = async (req, res) => {
    const { name, email_id, password, employee_id } = req.body;
    try {
        const existUsername = await User.findOne({ email_id: email_id });
        if (existUsername) {
            res.status(403).json({ message: "user already exist" });
        } else {
            const newUser = new User({ name, email_id, password, employee_id });
            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}

exports.loginUser = async (req, res) => {
    const { email_id, password } = req.body;
    try {
        const existUsername = await User.findOne({ email_id: email_id, password: password });
        if (existUsername) {
            res.status(200).json({ message: "user login successfully" });
        } else {
            res.status(404).json({ message: "user not found" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

};
exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            res.json({ message: "user not found" });
        } else {
            res.json(updatedUser);
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const deleteduser = await User.findByIdAndDelete(req.params.id);
        if (!deleteduser) {
            res.json({ message: "user not found" });
        } else {
            res.json({ message: "user deleted successfully" });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}