const InvariantError = require('../../exception/InvariantError');
const { AlbumPayloadSchema } = require('./schema');

const AlbumValidator = {
  validateAlbumPayload: (payload) => {
    const validatinResult = AlbumPayloadSchema.validate(payload);
    if (validatinResult.error) {
      throw new InvariantError(validatinResult.error.message);
    }
  },
};

module.exports = AlbumValidator;
