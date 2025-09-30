const express = require("express");
const crypto = require('crypto');
const { removeToken, addToken } = require('../Services/token')

const router = express.Router();

let user = [
    { name: "ssss", password: "12345" },
    { name: "yyyy", password: "1111" }
]

let active = [];
router.post("/register", (req, res) => {
    const { name, password } = req.body;

    const userExists = user.find(u => u.name === name);
    if (userExists) {
        return res.status(400).json({ status: "error", message: "User already exists" });
    }

    user.push({ name, password });

    const token = generateToken();
    addToken(token);
    res.status(201).json({ status: "ok", message: "User registered successfully", token });
});

router.post("/login", (req, res) => {
    const { name, password } = req.body;
    const userFound = user.find(u => u.name === name && u.password === password);
    if (userFound) {
        const token = generateToken();
        addToken(token);
        active.push(token);
        res.status(200).json({ status: "ok", message: "Login successful", token });
    } else {
        res.status(401).json({ status: "error", message: "Invalid credentials" });
    }
});

router.post("/logout", (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ status: "error", message: "Unauthorized" });
    }

    const parts = authHeader.split(' ');
    if (parts[0] !== 'Bearer' || !parts[1]) {
        return res.status(401).json({ status: "error", message: "Invalid token" });
    }

    const token = parts[1];
    const index = active.indexOf(token);

    if (index === -1) {
        return res.status(403).json({ status: "error", message: "Token not found" });
    }

    active.splice(index, 1);
    removeToken(token);
    res.json({ status: "ok", message: "Logout successful" });
});

function generateToken() {
    return crypto.randomBytes(32).toString('hex');
}

module.exports = router;