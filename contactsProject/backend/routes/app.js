const { body, param, validationResult } = require('express-validator');//import express-validator
const router = require('express').Router(); //instantiate Router from express ()
const friendsController = require('../controllers/friends'); //import all logic from friends.js (module getData)

//Middleware to check validation results

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Retorna um JSON padronizado de erro de validação
    return res.status(400).json({
      message: 'Validation failed.',
      errors: errors.array().map(e => ({
        field: e.param,
        message: e.msg
      }))
    });
  }
  next();
};


//get all data from friends collection
router.get('/all', friendsController.getAllData);
//get especif  element by id from friends collection
router.get('/:id', friendsController.getSingleById);

router.get('/', friendsController.getAllData);

router.post('/',
  [
    body('firstName')
      .notEmpty().withMessage('First name is required.')
      .isString().withMessage('First name must be a string.'),

    body('lastName')
      .notEmpty().withMessage('Last name is required.')
      .isString().withMessage('Last name must be a string.'),

    body('email')
      .notEmpty().withMessage('Email is required.')
      .isEmail().withMessage('Invalid email format.'),

    body('favoriteColor')
      .optional()
      .isString().withMessage('Favorite color must be a string.'),

    body('dob')
      .optional()
      .isISO8601().withMessage('Date of birth must be a valid date.')
  ],
  handleValidation,
  friendsController.createFriend);//validation for post method


router.put('/:id',
    [
    param('id')
      .exists().withMessage('ID is require.')
      .isLength({ min: 24, max: 24 }).withMessage('ID must be characters long.')
      .isHexadecimal().withMessage('ID must be a valid hexadecimal String.'),
  
    body('firstName')
      .optional()
      .isString().withMessage('First name must be a string.'),

      body('lastName')
        .optional()
        .isString().withMessage('Last name must be a string.'),

      body('email')
        .optional()
        .isEmail().withMessage('Invalid email format.'),

      body('favoriteColor')
        .optional()
        .isString().withMessage('Favorite color must be a string.'),

      body('dob')
        .optional()
        .isISO8601().withMessage('Date of birth must be a valid date.')
  
  ],
  handleValidation,
  friendsController.updateFriend);


router.delete('/:id',
  
  [
    param('id')
      .exists().withMessage('ID is required.')
      .isLength({ min: 24, max: 24 }).withMessage('ID must be 24 long characters.')
      .isHexadecimal().withMessage('ID must be a valid hexadecimal string.')

  ],
  handleValidation,
  friendsController.deleteFriend);

module.exports = router; //exports the Router to be used in server.js
