/*
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { findOrCreateDevFromGoogle, findOrCreateDevFromGitHub } from '../services/auth.service';
import { logger } from '../utils/logger';

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: "/api/v2/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const dev = await findOrCreateDevFromGoogle(profile);
    done(null, dev);
  } catch (error) {
    logger.error(`Google OAuth error: ${error}`);
    done(error as Error);
  }
}));

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID!,
  clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  callbackURL: "/api/v2/auth/github/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const dev = await findOrCreateDevFromGitHub(profile);
    done(null, dev);
  } catch (error) {
    logger.error(`GitHub OAuth error: ${error}`);
    done(error as Error);
  }
}));

passport.serializeUser((dev: any, done) => {
  done(null, dev._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const dev = await Dev.findById(id);
    done(null, dev);
  } catch (error) {
    done(error);
  }
});
*/
