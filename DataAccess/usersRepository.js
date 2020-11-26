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
            userPassword: String
        });
    }

    async inserUser(user) {
        var User = mongoose.model('user', this.UserSchema);
        var newUser = new User({ userName: user.userName, userPassword: user.password });
        newUser.save(function (err, user) {
            if (err) return console.error(err);
            console.debug(user.username)
            return user.userName;
        });
    }

    async getUser(userName) {
        try{
        var User = mongoose.model('user', this.UserSchema);
        return await User.find({ userName: userName });
        }catch(err){
            return undefined
        }
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





