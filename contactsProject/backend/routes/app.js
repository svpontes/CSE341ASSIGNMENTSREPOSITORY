const router = require('express').Router();//instantiate Router from express ()
const friendsController = require('../controllers/friends');//import all logic from friends.js (module getData)

//second endpoint /friends/all (return all itens from the list friends)
router.get('/all', friendsController.getAllData);//map the Router root path to friends in the server to the module getAllData(return all itens from the list)

//first endpoint /friends/:id (return all itens from the list friends)
router.get('/:id', friendsController.getSingleById);//map the Router root path to friends in the server to the module getAllData(return all itens from the list)


router.get('/', friendsController.getAllData); // Rota raiz do Router
module.exports = router; //exports the Router to be used in server.js