import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcrypt";
import { User } from "../../schema/userSchema.js";

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
    done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
    console.log("id", id);
    const user = await User.findById(id);
    if (!user) {
        return res.status(401).json({
            err: "Unauthorised user"
        })
    }
    done(null, user);
})

export default localStrategy;