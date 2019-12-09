const urlHistory = require('../controllers/urlController');
const monitor = require('../controllers/monitorController')

module.exports = app => {
  // GET /words
  // POST /words
  app
    .route('/monitor')
    .get(monitor.show)

  // GET /words/:wordId
  // PUT /words/:wordId
  // DELETE /words/:wordId
  app
    .route('/hosting')
    .get(urlHistory.show)
    .put(urlHistory.add)
};