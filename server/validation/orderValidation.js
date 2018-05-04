import { body, param } from 'express-validator/check';
import { sanitizeBody } from 'express-validator/filter';

export default {
  create: [
    body('mealId')
      .isInt()
      .withMessage('Parameter must be an integer'),
    body('address')
      .trim()
      .isLength({ min: 1 }).trim()
      .withMessage('Address cannot be empty.')
      .exists()
      .withMessage('Address must be specified')
      .isLength({ min: 15, max: 255 })
      .withMessage('Text must be between 15 and 255 characters'),
      // .matches(/^[a-z 0-9 (),.'-]+$/i)
      // .matches(/^[a-z A-Z 0-9(),.'-]*$/i)
      // .withMessage('Address can only contain alphanumerics and symbols .,-\'())'),
    sanitizeBody('address').trim().escape(),
  ],
  update: [
    param('id')
      .isInt()
      .withMessage('Parameter must be an integer'),
    body('qty')
      .trim()
      .optional({ checkFalsy: true })
      .isInt()
      .withMessage('Parameter must be an integer'),
    sanitizeBody('qty').trim().escape(),
  ],
  delete: [
    param('id')
      .isInt()
      .withMessage('Parameter must be an integer'),
  ],
};
