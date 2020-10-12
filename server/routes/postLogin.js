const bcrypt = require('bcryptjs')

module.exports = function(app, usersCollect) {

    app.post('/api/auth', function(req,res) {

        usersCollect.findOne({ username: req.body.username }, (err, data) => {
            if (err) { return res.sendStatus(400); }
            if(data == null) {
                return res.status(200).send({code: 1, message: "User could not be found"});
            }

            bcrypt.compare(req.body.password, data.password, (err, result) => {
                if(err) { return res.sendStatus(400); }
                if (result === true) {
                    return res.status(200).send({ _id: data._id, username: data.username, email: data.email, role: data.role });
                } else {
                    return res.status(200).send({ code: 2, message: "Password does not match"});
                }
            });
        });
    });
};