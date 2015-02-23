module.exports = {
    method: 'GET',
    path: '/tags/{tag}',
    handler: require('./handlers/getTags')
}