import supabase from "../config/supabase.js";

// Set authentication cookie
const setAuthCookie = (res, token) => {
  res.cookie("access_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 1000,
  });
};

// Register a new user
export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long.",
      });
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    if (data.session) {
      setAuthCookie(res, data.session.access_token);
    }

    res.status(201).json({
      message: data.session
        ? "Account created successfully."
        : "Account created. Please verify your email before logging in.",
      user: data.user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong during registration.",
    });
  }
};

// Login an existing user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required.",
      });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({
        message: error.message,
      });
    }

    setAuthCookie(res, data.session.access_token);

    res.status(200).json({
      message: "Login successful.",
      user: data.user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong during login.",
    });
  }
};

// Get the currently logged-in user
export const getCurrentUser = (req, res) => {
  res.status(200).json({
    message: "Session is valid.",
    user: req.user,
  });
};

// Logout user
export const logout = (req, res) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  res.status(200).json({
    message: "Logout successful.",
  });
};