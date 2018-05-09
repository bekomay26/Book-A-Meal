import { body } from 'express-validator/check';
import { sanitizeBody } from 'express-validator/filter';

export default {
  create: [
    body('username')
      .trim().isLength({ min: 1 }).withMessage('Username cannot be empty.')
      .isLength({ max: 20 })
      .withMessage('Username cannot be more than 20 characters long')
      .exists()
      .withMessage('Username must be specified'),
    body('password')
      .trim()
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long'),
    sanitizeBody('username').trim().escape(),
    sanitizeBody('address').trim().escape(),
    sanitizeBody('role').trim().escape(),
  ],
};
