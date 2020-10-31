const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: { type: String },
    fullname: { type: String }, //{ type: String, unique: true, default: "" },
    email: { type: String, sparse: true },
    password: { type: String, sparse: true },
    userImage: { type: String, default: "default.png" },
    facebook: { type: String, sparse: true },
    fbTokens: Array,
    google: { type: String, sparse: true },
    sentRequest: [
        {
            username: { type: String }
        }
    ],
    requests: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" }
        }
    ],
    friendsList: [
        {
            friendId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },

            //Notifies the user whether they have read the message called
            //friend request is accepted
            readBy: [
                {
                    user: {
                        type: Schema.Types.ObjectId,
                        ref: "users"
                    }
                }
            ]
        }
    ],
    totalRequest: {
        type: Number
    },
    gender: {
        type: String,
        default: ""
    },
    country: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    favGroup: [
        {
            groupname: { type: String }
        }
    ],
    favPlayer: [
        {
            playername: { type: String }
        }
    ]
});

UserSchema.pre("save", function (next) {
    ``;
    const user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified("password")) return next();

    // generate a salt
    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password);
};
mongoose.model("users", UserSchema);
