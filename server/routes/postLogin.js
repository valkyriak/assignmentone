module.exports = function(app, path){
    const fs  = require("fs");
    app.post('/api/auth', function(req,res) {
          if (!req.body) {
              return res.sendStatus(400)
          }
          var user = {};
          user.valid = false;
          user.id = 0;
          user.role = '';
          user.email = '';
          user.password = '';
          user.username = '';

        fs.readFile('./data/users.json', function read(err, data){
            if (err) {
                throw err;
            }
            accounts = JSON.parse(data);

            let user = accounts.find(use => ((use.username == req.body.username) && (use.password == req.body.password)));

            if (user) {
                user.ok = true;
                user.password = "";
                res.send(user);
                console.log(user);
            } else {
                res.send({"ok":false});
            }
        })
    })
}