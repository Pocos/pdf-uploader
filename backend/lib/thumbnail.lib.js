const gm = require('gm');
const log = require('./logger.lib').getLogger('thumbnail.lib');

const generateThumbnailForPdfByPath = (pdfPath) => {
  gm(pdfPath).thumb(150, // Width
    150, // Height
    `${pdfPath}_thumbnail.png`, // Output file name
    40, // Quality from 0 to 100
    (error, stdout, stderr, command) => {
      if (!error) {
        log.info(command);
      } else {
        log.error(error);
      }
    });
};

exports.generateThumbnailForPdfByPath = generateThumbnailForPdfByPath;
