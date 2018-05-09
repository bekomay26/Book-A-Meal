import { validationResult } from 'express-validator/check';

/**
 * Create a validation helper class
 */
class ValidationHelper {
  /**
   * Sends existing validation errors
   * @method validate
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @memberof ValidationHelper
   * @returns {(json)}JSON object
   */
  static validate(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }
    next();
  }
}

export default ValidationHelper;
