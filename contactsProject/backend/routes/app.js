const router = require('express').Router(); //instantiate Router from express ()
const friendsController = require('../controllers/friends'); //import all logic from friends.js (module getData)

/**
 * @swagger
 * tags:
 *   name: Friends
 *   description: API para gerenciamento de Friends
 */

/**
 * @swagger
 * /friends/all:
 *   get:
 *     summary: Retorna todos os friends
 *     tags: [Friends]
 *     responses:
 *       200:
 *         description: Lista de friends retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Erro ao acessar o banco
 */
router.get('/all', friendsController.getAllData);

/**
 * @swagger
 * /friends/{id}:
 *   get:
 *     summary: Retorna um friend pelo ID
 *     tags: [Friends]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do friend para busca
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucesso - Friend encontrado
 *       404:
 *         description: Friend não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.get('/:id', friendsController.getSingleById);

/**
 * @swagger
 * /friends:
 *   get:
 *     summary: Retorna todos os friends (rota raiz do router)
 *     tags: [Friends]
 *     responses:
 *       200:
 *         description: Lista retornada com sucesso
 */
router.get('/', friendsController.getAllData);

router.post('/', friendsController.createFriend);
router.put('/:id', friendsController.updateFriend);
router.delete('/:id', friendsController.deleteFriend);

module.exports = router; //exports the Router to be used in server.js
