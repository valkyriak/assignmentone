let user = require('../model/user');
let User = user.User;

module.exports = function(req, res) {
    console.log(req);
    u = req.body.username;
    p = req.body.password;

    let accounts= [
        new User("admin1", "123", "admin1@yeet.com", 20, "13/10/1999"),
        new User("admin2", "123", "admin2@yeet.com", 40, "29/04/1979"),
        new User("admin3", "123", "admin3@yeet.com", 55, "08/11/1965")]  

    if (!req.body) {
        console.log(req.body)
        return res.sendStatus(400);
    }
    console.log(u)
    console.log(p)
    let i = accounts.find(user =>
        ((user.username == u) && (user.password == p)));
        
    if (i) {
        i.ok = true
        res.send(i);
        
    } else {
        res.send({"ok": false});
    }
}

// module.exports = function(app) {
//     // app.use(bodyParse.json());
    
//     app.post('/api/auth', function(req, res){
//         console.log(req.body);
//         u = req.body.username;
//         p = req.body.password;

//     let accounts= [
//         new User("admin1", "123", "admin1@yeet.com", 20, "13/10/1999"),
//         new User("admin2", "123", "admin2@yeet.com", 40, "29/04/1979"),
//         new User("admin3", "123", "admin3@yeet.com", 55, "08/11/1965")]  

//         if (!req.body) {
//             console.log(req.body)
//             return res.sendStatus(400);
//         }
//         console.log(u)
//         console.log(p)
//         let i = accounts.find(use =>
//             ((user.username == u) && (user.password == p)));
            
//         if (i) {
//             i.ok = true
//             console.log('debug')
//             res.send(i);
            
//         } else {
//             res.send({"ok": false});
//         }
//     });
// }