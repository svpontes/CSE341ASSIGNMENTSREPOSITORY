const router = require('express').Router();//istantiate Router from express ()
const friendsController = require('../controllers/friends');//import all logic from friends.js (module getData)

//first endpoint /friends/ (return one item from the list friends)
router.get('/', friendsController.getData);//map the Router root path to friends in the server to the module getData(return one item from the list)

//second endpoint /friends/all (return all itens from the list friends)
router.get('/all', friendsController.getAllData);//map the Router root path to friends in the server to the module getAllData(return all itens from the list)

module.exports = router; //exports the Router to be used in server.js