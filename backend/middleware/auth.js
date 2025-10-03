export const validateUserInput = (req, res, next) => {
  const { username, name, email, password, role } = req.body;

  // 🔹 Username check
  if (!username) {
    return res.status(400).send("Username is required");
  }
  if (username.length < 5 || username.length > 9) {
    return res.status(400).send("Username must be between 5 and 9 characters");
  }
  const usernamePattern = /^[a-zA-Z0-9_]+$/;
  if (!usernamePattern.test(username)) {
    return res
      .status(400)
      .send("Username can only contain letters, numbers, and underscores");
  }

  // 🔹 Name check
  if (!name || name.trim().length < 2) {
    return res.status(400).send("Name must be at least 2 characters long");
  }

  // 🔹 Email check
  if (!email) {
    return res.status(400).send("Email is required");
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return res.status(400).send("Please enter a valid email address");
  }
  

  // 🔹 Password check
  if (!password) {
    return res.status(400).send("Password is required");
  }
  if (password.length < 8 || password.length > 16) {
    return res
      .status(400)
      .send("Password must be between 8 and 16 characters long");
  }
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
    return res.status(400).send(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    );
  }

  // 🔹 Role check
  if (role && !["admin", "customer"].includes(role)) {
    return res.status(400).send("Role must be either 'admin' or 'customer'");
  }

  next(); // ✅ Pass to next middleware/route
};

export const validateSignin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).send("Email is required");
  }

  if (!password) {
    return res.status(400).send("Password is required");
  }

  next();
};

