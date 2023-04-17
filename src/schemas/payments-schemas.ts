import Joi from 'joi';

const CardDataSchema = Joi.object({
    issuer: Joi.string().required(),
    number: Joi.string().required(),
    name: Joi.string().required(),
    expirationDate: Joi.string().required(),
    cvv: Joi.string().length(3).required()
});

export const PaymentDataSchema = Joi.object({
    ticketId: Joi.number().integer().required(),
    cardData: CardDataSchema.required()
});