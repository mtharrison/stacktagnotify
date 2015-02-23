var Soclient = require('./soclient');


module.exports = function (server) {

    server.method('getTags', function (tag, callback) {

        Soclient.get('questions', {
            order: 'desc',
            page: 1,
            pagesize: 10,
            sort: 'creation',
            tagged: tag,
            site: 'stackoverflow'
        }, function (err, data) {
            
            callback(err, data);
        });
    }, {});
};