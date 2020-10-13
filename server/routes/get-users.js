// module.exports = function(userCollect, app) {

//     app.get('/api/getusers/', (req, res) => {
//         userCollect.find({}, {projection: {password:0}}).toArray( (err, result) => {
//             if(err) { return res.sendStatus(400); }
//             return res.status(200).send(result);
//         });
//     });
// };