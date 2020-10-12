
module.exports = function(app, userCollect, ObjectID) {

    app.get('/api/getusers/:id', function(req,res) {
        let userID = ObjectID(req.params.id);
        userCollect.findOne({_id: userID}, {projection: {password:0}}, (err, result) => {
            if(err) { return res.sendStatus(400); }
            return res.sendStatus(200).send(result);
        })
    });
};