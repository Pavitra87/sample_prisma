const { generateToken } = require('../utils/jwt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs')

//register
const signup = (async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //find user
        const findUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        //check if user already exist
        if (findUser) {
            return res.status(400).json("email already exist")
        }
        //hashed password
        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password, salt)

        //create new user
        const newUser = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedpassword
            }
        })

        res.status(201).json(newUser)

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
})

// //login
const login = (async (req, res) => {
    try {
        const { email, password } = req.body;

        //find user by email
        const user = await prisma.user.findUnique({
            where: { email: email }
        });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email ' });
        }

        // compare password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid  password" });
        }

        //token
        const payload = {
            id: user.id,
            isAdmin: user.isAdmin
        }
        const token = generateToken(payload)
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


//update user
const update = (async (req, res) => {
    const userId = req.params.id;
    const { name, email, age } = req.body;
    try {
        const updateuser = await prisma.user.update({
            where: {
                id: Number(userId)
            },
            data: {
                name,
                email,
                age,
            }
        })
        res.status(200).json(updateuser);
    } catch (error) {
        console.log(error)
    }

})

// //get all users
const fetchusers = (async (req, res) => {
    try {
        const users = await prisma.user.findMany({})
        res.status(200).json({ users })
    } catch (error) {
        res.status(400).json(error)
    }
})

//show one user
const showUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await prisma.user.findFirst({
            where: {
                id: Number(userId)
            }
        })
        res.status(200).json(user);
    } catch (error) {
        console.log(error)
    }

}

//delete user
const deleteUser = async (req, res) => {

    try {
        const userId = req.params.id;
        const deleteuser = await prisma.user.delete({
            where: { id: Number(userId) },
        });
        res.status(200).json({ message: 'user deleted successfully' })
    } catch (error) {
        console.log(error)
    }
}
module.exports = { signup, login, update, fetchusers, showUser, deleteUser }