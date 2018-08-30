import { body, param, query } from 'express-validator/check';
import { sanitizeBody } from 'express-validator/filter';

export default {
  create: [
    body('title')
      .trim().isLength({ min: 1 }).withMessage('Title cannot be empty.')
      .isLength({ max: 40 })
      .withMessage('Title cannot be more than 40 characters long')
      .exists()
      .withMessage('Title must be specified'),
    body('description')
      .trim()
      .optional({ checkFalsy: true }) // null and empty strings will not fail validation
      .isLength({ max: 255 })
      .withMessage('Description cannot be more than 255 characters long'),
    body('image')
      .trim()
      .optional({ checkFalsy: true }),
    body('price')
      .isLength({ min: 1 }).trim().withMessage('Price cannot be empty.')
      .exists()
      .withMessage('Price must be specified')
      .isInt()
      .withMessage('Price must be an integer decimals not allowed')
      .custom(value => value > 200)
      .withMessage('Price must not be less than 200'),
    sanitizeBody('title').trim().escape(),
    sanitizeBody('description').trim().escape(),
    sanitizeBody('image').trim().escape(),
    sanitizeBody('price').trim().escape(),
  ],
  update: [
    param('id')
      .isInt()
      .withMessage('Parameter must be an integer'),
    body('title')
      .trim()
      .optional({ checkFalsy: true })
      .isLength({ min: 1 })
      .withMessage('Title cannot be empty.')
      .exists()
      .withMessage('Title must be specified')
      .isLength({ max: 40 })
      .withMessage('Title cannot be more than 40 characters long'),
    body('description')
      .trim()
      .optional({ checkFalsy: true })
      .isLength({ max: 255 })
      .withMessage('Title cannot be more than 255 characters long'),
    body('image')
      .trim()
      .optional({ checkFalsy: true }),
    body('price')
      .trim()
      .optional()
      .isLength({ min: 1 })
      .trim()
      .withMessage('Price cannot be empty.')
      .exists()
      .withMessage('Price must be specified')
      .isInt()
      .withMessage('Price must be an integer decimals not allowed')
      .custom(value => value > 200)
      .withMessage('Price must not be less than 200'),
    sanitizeBody('title').trim().escape(),
    sanitizeBody('description').trim().escape(),
    sanitizeBody('image').trim().escape(),
    sanitizeBody('price').trim().escape(),
  ],
  delete: [
    param('id')
      .isInt()
      .withMessage('Parameter must be an integer'),
  ],
  get: [
    query('limit')
      .optional()
      .trim()
      .isNumeric()
      .withMessage('limit must be an integer')
      .isInt({ min: 0 })
      .withMessage('limit cannot be less than zero'),
    query('offset')
      .optional()
      .trim()
      .isNumeric()
      .withMessage('limit must be an integer')
      .isInt({ min: 0 })
      .withMessage('limit cannot be less than zero'),
  ],
};
