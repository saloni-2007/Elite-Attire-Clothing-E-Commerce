const jwt=require("jsonwebtoken");
const User=require("../models/userModel");

async function authMiddleware(req, res, next) {
    console.log("Cookies =>", req.cookies);

    const { token } = req.cookies;

    console.log("Token =>", token);

    if (!token) {
        return res.status(400).send({
            success: false,
            message: "Unauthorized Access",
        });
    }

    const tokenData = jwt.verify(token, process.env.JWT_SECRET);

    const userData = await User.findById(tokenData.userId).select("-password");

    req.user = userData;

    next();
}
module.exports=authMiddleware;