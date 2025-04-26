import admin from "../lib/firebase.js";
// we need to verify token and proceeed with user info ahead
export const verifyToken = async (req, res, next) => {
  // get the token from frontend
  const token = req.headers.authorization?.split(" ")[1];
  // if no token then user is not authorised
  if (!token) {
    return res.status(401).json({ message: "No token" });
  }
  // if token present decode the user from that token
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    // if token is valid then we can proceed saving user info and forwarding it
    req.user=decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
}