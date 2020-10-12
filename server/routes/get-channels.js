module.exports = function(channelCollect, app, ObjectID) {

    const fs = require('fs');
    app.get('/api/get-channels/:group_id', function(req,res) {
        let objectid = ObjectID(req.params.group_id);
        channelCollect.find({room_id: objectid}).toArray( (err, result) => {
            if(err) { 
                return res.sendStatus(400); 
            }
            return res.send(result)
        });
    });
}
