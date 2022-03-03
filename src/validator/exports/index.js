const InvariantError = require('../../exception/InvariantError');
const ExportSongPayloadSchema = require('./schema');

const ExportsValidator = {
  validateExportSongPayload: (payload) => {
    const validationResult = ExportSongPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = ExportsValidator;
