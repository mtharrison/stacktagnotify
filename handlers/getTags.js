exports = module.exports = function (request, reply) {

    request.server.methods.getTags(request.params.tag, function (err, result) {

        reply(result);
    });
};