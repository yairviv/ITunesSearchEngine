var mongoose = require('mongoose');

class usersRepository {
    constructor() {
        mongoose.connect('mongodb://127.0.0.1:27017/Itunes', { useNewUrlParser: true, useUnifiedTopology: true });
        this.db = mongoose.connection;
        this.db.on('error', console.error.bind(console, 'connection error:'));
        this.db.once('open', function () {
            console.log.bind(console, 'DB connected')
        });
        this.UserSchema = new mongoose.Schema({
            userName: String,
        });
    }

    async inserUser(userName) {
        var User = mongoose.model('user', this.UserSchema);
        var newUser = new User({ userName: userName });
        newUser.save(function (err, user) {
            if (err) return console.error(err);
            console.debug(user.username)
            return user.userName;
        });
    }

    /*

    async inserUser(userName) {
        var User = mongoose.model('user', this.UserSchema);
        var newUser = new User({ userName: userName });
        User.findOne({ 'userName': userName }, function (err, fetchedUser) {
            if (err) return handleError(err);
            console.log(fetchedUser)
            if (fetchedUser == undefined) {
                newUser.save(function (err, user) {
                    if (err) return console.error(err);
                    console.debug(user.username)
                    return user.userName;
                });
            }
        });
    }
    */

}

module.exports = new usersRepository();





