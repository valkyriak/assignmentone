module.exports = function(userCollect, app, ObjectId) {

    app.get('/api/users/:id', (req, res) => {
        let userID = ObjectId(req.params.id);
        userCollect.findOne({_id: userID}, {projection: {password:0}}, (err, result) => {
            if(err) { return res.sendStatus(400); }
            return res.status(200).send(result);
        });
    });
}