const bcrypt = require('bcrypt');
const User = require('../models/user'); 

const signup = async (req, res) => {
    try {
        // console.log(req.body);
        console.log('new user',req.body.username)
        const { username, password, email, mobile } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashedPassword, email, mobile });
        res.status(201).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error signing up' });
    }
};
const signin = async (req, res) => {
    try {   
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error signing in' });
    }
}
module.exports = {signup,signin};
