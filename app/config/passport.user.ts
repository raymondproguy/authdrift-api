/*
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { findOrCreateUserFromGoogle, findOrCreateUserFromGitHub } from '../services/oauth.user';
import User from '../models/user.model';
import { logger } from '../utils/logger';

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: "/api/v2/user-auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const user = await findOrCreateUserFromGoogle(profile);
    done(null, user);
  } catch (error) {
    logger.error(`Google OAuth error: ${error}`);
    done(error as Error);
  }
}));

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID!,
  clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  callbackURL: "/api/v2/user-auth/github/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const user = await findOrCreateUserFromGitHub(profile);
    done(null, user);
  } catch (error) {
    logger.error(`GitHub OAuth error: ${error}`);
    done(error as Error);
  }
}));

passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
*/
