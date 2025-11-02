const mongodb = require('../db/connect');//imports the db access module
const { ObjectId } = require('mongodb');//import the objectId from mongodb 

const getAllData = async (req, res, next) => {//get data async way
  const result = await mongodb.getDb().collection('friends').find(); //result waits from the connect to the db and get the collection friends executing the query 'find'
  //format data and send a reposnse HTTP
  result.toArray().then((lists) => { //convert result int an array
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists); //send HTTP response: STATUS 200 (OK) and all elements of the collection (JSON format)
  });
};

//get itens by id
const getSingleById = async (req, res, next) => {
    // 1. [ADICIONADO] Bloco try...catch para tratar o BSONError
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().collection('friends').find({ _id: userId });

        result.toArray().then((lists) => {
            if (lists.length > 0) {
                res.setHeader('Content-type', 'application/json');
                res.status(200).json(lists[0]);
            } else {
                // ID válido, mas não encontrado no DB
                res.status(404).json({ message: 'Friend not found with ID: ' + req.params.id });
            }
        });
    } catch (err) {
        
        if (err.name === 'BSONError' || err.message.includes('must be a 24 character hex string')) {
            return res.status(400).json({ 
                message: 'Invalid ID format provided.',
                details: 'The ID must be a valid 24-character hexadecimal string.'
            });
        }
        // Trata outros erros internos
        res.status(500).json({ message: 'Error retrieving friend!', error: err.message });
    }
};

module.exports = {getAllData, getSingleById };//exposts the functions to be used by Router