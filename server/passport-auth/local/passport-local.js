import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcrypt";
import { User } from "../../schema/userSchema.js";

const localStrategy = new Strategy({ usernameField: "email" }, async (username, password, done) => {
    try {
        console.log("ip username, pass -> ", username, password);
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
    done(null, { id: user.id })
})

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    if (!user) {
        return resizeBy.status(401).json({
            err: "Unauthorised"
        })
    }
    done(null, user);
})

export default localStrategy;