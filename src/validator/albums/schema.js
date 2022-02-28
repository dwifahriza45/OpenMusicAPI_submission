const Joi = require('joi');

const AlbumPayloadSchema = Joi.object({
  name: Joi.string().required(),
  year: Joi.number().required().integer().min(1900)
    .max(2022),
});

module.exports = { AlbumPayloadSchema };
