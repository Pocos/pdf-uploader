const log = require('./lib/logger.lib').getLogger('server.js');
const setupExpress = require('./config/express.config');
// Initialize mongo
// require('./model/entity/connection.manager');

const app = setupExpress();

app.listen(app.get('port'), () => {
  log.info(`Express server listening on port ${app.get('port')}`);
});
