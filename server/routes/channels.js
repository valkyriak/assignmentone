module.exports = function(app, path) {

    const fs = require('fs');
    app.post('/api/channels', function(req,res) {
        if (!req.body) {
            return res.sendStatus(400);
        }

        fs.readFile('./data/channel_groups.json', (err, data) => {
            if (err) {
                throw err;
            } else {
                res.send(JSON.parse(data).channels);
            }
        });
    });
}
