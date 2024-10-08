import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

// Strategy configuration
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`,
            passReqToCallback: true // Important to have access to req in the callback
        },
        // Run function after a successful auth request
        async (req, accessToken, refreshToken, profile, done) => {
            try {
                const redirect = req.query.state; // Use the original state passed as redirect
                // Search author in mongoDB by googleid
                let user = await User.findOne({ googleId: profile.id })

                // Create new author if not exist yet
                if (!user) {
                    user = new User({
                        googleId: profile.id,
                        name: profile.name.givenName,
                        surname: profile.name.familyName,
                        email: profile.emails[0].value,
                        avatar: profile.photos[0].value
                    })
                }

                // Save author on MongoDb
                await user.save();

                // Pass author to passport middleware without error
                done(null, user, { redirect }); // Pass redirect as part of the login

            } catch (err) {
                console.error(err);
                // Pass error to passport middleware
                done(err, null);
            }
        }
    )
);

// Serialization - save user id into the session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialization - find user id from the session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        // Pass user to passport middleware without error
        done(null, user);
    } catch (err) {
        // Pass error to passport middleware
        done(err, null);
    }
})

export default passport;