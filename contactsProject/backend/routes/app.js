const router = require('express').Router(); //instantiate Router from express ()
const friendsController = require('../controllers/friends'); //import all logic from friends.js (module getData)
//get all data from friends collection
router.get('/all', friendsController.getAllData);
//get especif  element by id from friends collection
router.get('/:id', friendsController.getSingleById);

router.get('/', friendsController.getAllData);

router.post('/', friendsController.createFriend);

router.put('/:id', friendsController.updateFriend);

router.delete('/:id', friendsController.deleteFriend);

module.exports = router; //exports the Router to be used in server.js
