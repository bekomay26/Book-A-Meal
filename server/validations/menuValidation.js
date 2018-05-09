import { body, param } from 'express-validator/check';
import { sanitizeBody } from 'express-validator/filter';

export default {
  create: [
    body('date')
      .isLength({ min: 1 }).trim().withMessage('Date cannot be empty.'),

    sanitizeBody('date').trim().escape(),
  ],

  delete: [
    param('id')
      .isInt()
      .withMessage('Parameter must be an integer'),
  ],
};
