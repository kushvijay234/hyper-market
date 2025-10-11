// auth.js
export const validateUserInput = (req, res, next) => {
  const { username, name, email, password, role } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }
  if (username.length < 5 || username.length > 9) {
    return res.status(400).json({ error: "Username must be between 5 and 9 characters" });
  }
  const usernamePattern = /^[a-zA-Z0-9_]+$/;
  if (!usernamePattern.test(username)) {
    return res.status(400).json({ error: "Username can only contain letters, numbers, and underscores" });
  }

  if (!name || name.trim().length < 2) {
    return res.status(400).json({ error: "Name must be at least 2 characters long" });
  }

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email address" });
  }

  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }
  if (password.length < 8 || password.length > 16) {
    return res.status(400).json({ error: "Password must be between 8 and 16 characters long" });
  }
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
    return res.status(400).json({
      error: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    });
  }

  if (role && !["admin", "customer"].includes(role)) {
    return res.status(400).json({ error: "Role must be either 'admin' or 'customer'" });
  }

  next();
};

export const validateSignin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }

  next();
};