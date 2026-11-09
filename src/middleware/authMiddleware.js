import supabase from "../config/supabase.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;

    if (!token) {
      return res.status(401).json({
        message: "Access denied. Please log in.",
      });
    }

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return res.status(401).json({
        message: "Invalid or expired session. Please log in again.",
      });
    }

    // Store authenticated user information
    req.user = data.user;
    req.accessToken = token;

    next();
  } catch (error) {
    res.status(500).json({
      message: "Authentication failed.",
    });
  }
};

export default authMiddleware;