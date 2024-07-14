import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcrypt";
import { User } from "../../models/userSchema.js";

const localStrategy = new Strategy({ usernameField: "email" }, async (username, password, done) => {
    try {
        const findUser = await User.findOne({ email: username });
        if (!findUser) {
            throw Error("User does not exists");
        }
        const matchPassword = await bcrypt.compare(password, findUser.password);
        if (!matchPassword) {
            throw Error("Password does not match");
        }
        done(null, findUser);
    } catch (error) {
        console.log("err -> ", error.message);
        done(error.message, null);
    }
})

passport.use(localStrategy);

passport.serializeUser((user, done) => {
    done(null, { id: user._id, username: user.username })
})

passport.deserializeUser(async ({ id, username }, done) => {
    const user = await User.findById(id);
    if (!user) {
        return res.status(401).json({
            err: "Unauthorised user"
        })
    }
    done(null, user);
})

export default localStrategy;