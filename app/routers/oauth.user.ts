/*
import express from "express";
import passport from "passport";
import {
  handleAuthSuccess,
  handleAuthFailure,
  handleLogout
} from "../controllers/oauth.user";

const router = express.Router();

// Google OAuth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", {
  failureRedirect: "/api/v2/user-auth/failure"
}), handleAuthSuccess);

// GitHub OAuth
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));
router.get("/github/callback", passport.authenticate("github", {
  failureRedirect: "/api/v2/user-auth/failure"
}), handleAuthSuccess);

// Success/Failure routes
router.get("/success", (req, res) => res.json({ success: true, devn: req.user }));
router.get("/failure", handleAuthFailure);
router.post("/logout", handleLogout);

export default router;
*/
