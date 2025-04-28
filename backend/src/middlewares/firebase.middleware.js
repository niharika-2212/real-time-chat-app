import admin from "../lib/firebase.js";

const verifyToken = async (req, res, next) => {
  // get header from request
  const authHeader = req.headers.authorization;
  // check if header is present and starts with Bearer 
  // if not return 401 Unauthorized
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized - No token provided" });
  }
  // if yes get token from header
  const token = authHeader.split(" ")[1];
  console.log("Token:", token);
  // verify token using firebase admin SDK
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // You can access user info in next middleware
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(403).json({ message: "Forbidden - Invalid token" });
  }
};

export default verifyToken;
