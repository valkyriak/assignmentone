module.exports = function(groupCollect, app) {

    app.get('/api/getgroups', function (req, res) {

        groupCollect.find({}).toArray( (err, result) => {
            if(err) { return res.sendStatus(400); }
            return res.send(result);
        });
    });
};