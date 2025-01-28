const AuthService = require("../services/authService");

class AuthController {
  async signup(req, res) {
    try {
      const { username, email, password } = req.body;
      const result = await AuthService.signup(username, email, password);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      res.json(result);
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }

  async logout(req, res) {
    // Client-side logout (clear token)
    res.json({ message: "Logged out successfully" });
  }
}

module.exports = new AuthController();
