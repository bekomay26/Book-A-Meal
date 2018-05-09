import { body, param } from 'express-validator/check';
import { sanitizeBody } from 'express-validator/filter';

export default {
  createDay: [
    body('mealIds')
      .isArray()
      .withMessage('Input must be a list of meals i.e an array')
      .custom(value => value.length >= 2)
      .withMessage('Menu list must contain 2 or more meals'),

    sanitizeBody('date').trim().escape(),
  ],
  create: [
    body('date')
      .isLength({ min: 1 }).trim().withMessage('Date cannot be empty.'),
    body('mealIds')
      .isArray()
      .withMessage('Input must be a list of meals i.e an array')
      .custom(value => value.length >= 2)
      .withMessage('Menu list must contain 2 or more meals'),

    sanitizeBody('date').trim().escape(),
  ],

  delete: [
    param('id')
      .isInt()
      .withMessage('Parameter must be an integer'),
  ],
};
