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

router.post('/', friendsController.createFriend);//validation for post method


router.put('/:id', friendsController.updateFriend);

router.delete('/:id', friendsController.deleteFriend);

module.exports = router; //exports the Router to be used in server.js
