const registerUserSchema = {
    username: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Username is required"
        },
        isLength: {
            options: {
                min:3,
                max: 100
            },
            errorMessage: "Username must be atleast 3-100 characters long"
        }
    },
    email: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Email is required"
        },
        isEmail: {
            errorMessage: "Please enter a valid email"
        }
    },
    password: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Password is required"
        },
        isLength: {
            options: {
                min:8,
                max: 100
            },
            errorMessage: "Password must be atleast 8 characters long"
        }
    },
    profilePic: {}
}

export default registerUserSchema;