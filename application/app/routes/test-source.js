
    var apiRouter = express.Router();

    apiRouter.route('/test')

        .get(function(req, res) {
            User.findOne({name: req.decoded.name}, function (err, user) {
                res.json(user.searches);
            });
        })

        .post(function(req, res) {
            var search = new Search();
            search.query = req.body.query;

            search.save(function(err) {
                if (err) {
                    if (err.code == 11000) return res.json({ success: false, message: 'A search with that query already exists. '});
                    else return res.send(err);
                }
                res.json({ message: 'Search created!' });
            });
        });

    module.exports = router;
