const { isTokenActive } = require('../Services/token')
function isLoggedin(req, res, next) {
    console.log('gfds');
    if (!req.headers.authorization) { return res.status(401).json("Unauthorized") }
    if (!req.headers.authorization.startsWith("Bearer ")) { return res.status(401).json("Unauthorized") }

    const token = req.headers.authorization.split(" ")[1];

    if (token && isTokenActive(token)) {
        console.log("Authorized via middleware");
        next();
    } else {
        res.status(401).json("Unauthorized");
    }
}
module.exports = { isLoggedin };
