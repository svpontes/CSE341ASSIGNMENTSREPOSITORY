const mongodb = require('../db/connect');//imports the db access module

const getData = async (req, res, next) => {//get data async way
  const result = await mongodb.getDb().collection('friends').find(); //result waits from the connect to the db and get the collection friends executing the query 'find'
  //format data and send a reposnse HTTP
  result.toArray().then((lists) => { //convert result int an array
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]); //send HTTP response: STATUS 200 (OK) and the first element of the collection (JSON format)
  });
};



//pergunta no ai: aqui retorna um item de collection 'friends'. ajude me a buscar totdos os itens, mas uma const separada desta:

const getAllData = async (req, res, next) => {//get data async way
  const result = await mongodb.getDb().collection('friends').find(); //result waits from the connect to the db and get the collection friends executing the query 'find'
  //format data and send a reposnse HTTP
  result.toArray().then((lists) => { //convert result int an array
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists); //send HTTP response: STATUS 200 (OK) and all elements of the collection (JSON format)
  });
};

module.exports = { getData, getAllData };//exposts the functions to be used by Router