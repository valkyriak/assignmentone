const bcrypt = require('bcrypt')

module.exports = function(app, userCollect) {

    app.post('/api/auth', function(req,res) {

        userCollect.findOne({ username: req.body.username }, function (err, data) {
            console.log("username entered is " + req.body.username);
            if (err) { 
                return res.sendStatus(400); 
            }
            if(data == null) {
                return res.status(200).send({code: 1, message: "User does not exist"});
            } else {
                console.log("broken")
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
