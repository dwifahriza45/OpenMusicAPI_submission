const InvariantError = require('../../exception/InvariantError');
const { SongPayloadSchema } = require('./schema');

const SongValidator = {
  validateSongPayload: (payload) => {
    const validatinResult = SongPayloadSchema.validate(payload);
    if (validatinResult.error) {
      throw new InvariantError(validatinResult.error.message);
    }
  },
};

module.exports = SongValidator;
