const mongodb = require('../db/connect');//imports the db access module
const { ObjectId } = require('mongodb');//import the objectId from mongodb 

const getAllData = async (req, res, next) => {//get data async way
  
  try {
    const result = await mongodb.getDb().collection('friends').find(); //result waits from the connect to the db and get the collection friends executing the query 'find'
    //format data and send a reposnse HTTP
    result.toArray().then((lists) => { //convert result int an array
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists); //send HTTP response: STATUS 200 (OK) and all elements of the collection (JSON format)
    })
      .catch((err) => {
        console.error('Error converting data to array:', err);
        res.status(500).json({
          message: 'Error processing data.',
          error: err.message
        });
      });
    } catch (err) {
    
     console.error('Database error in getAllData:', err);
      res.status(500).json({
      message: 'Database connection error.',
      error: err.message
    });
  }
};
       

// Get friend by ID
const getSingleById = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);

    const result = await mongodb.getDb().collection('friends').find({ _id: userId });
    result.toArray()
      .then((lists) => {
        if (lists.length > 0) {
          res.setHeader('Content-type', 'application/json');
          res.status(200).json(lists[0]);
        } else {
          res.status(404).json({ message: `Friend not found with ID: ${req.params.id}` });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: 'Error processing query results.',
          error: err.message
        });
      });

  } catch (err) {
    if (err.name === 'BSONError' || err.message.includes('24 character hex')) {
      return res.status(400).json({
        message: 'Invalid ID format provided.',
        details: 'The ID must be a valid 24-character hexadecimal string.'
      });
    }
    res.status(500).json({ message: 'Error retrieving friend.', error: err.message });
  }
};

// Create a new friend
const createFriend = async (req, res) => {
  try {
    // Simple validation for required fields
    const { firstName, lastName, email, favoriteColor, dob } = req.body;

    if (!firstName || !lastName || !email) {
      return res.status(400).json({
        message: 'Missing required fields: firstName, lastName, and email are required.'
      });
    }

    // Optional: basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format.' });
    }

    const friend = { firstName, lastName, email, favoriteColor, dob };

    const response = await mongodb.getDb().collection('friends').insertOne(friend);

    if (response.acknowledged) {
      res.status(201).json({
        message: 'Friend created successfully.',
        id: response.insertedId
      });
    } else {
      res.status(500).json({ message: 'Failed to create friend.' });
    }

  } catch (err) {
    console.error('Error creating friend:', err);
    res.status(500).json({ message: 'Server error creating friend.', error: err.message });
  }
};

//update friend
const updateFriend = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    const { firstName, lastName, email, favoriteColor, dob } = req.body;

    // Simple validation: ensure at least one field is being updated
    if (!firstName && !lastName && !email && !favoriteColor && !dob) {
      return res.status(400).json({ message: 'No data provided to update.' });
    }
    
    const result = await mongodb.getDb().collection('friends').replaceOne({ _id: userId }, updatedFriend);

      if (result.modifiedCount > 0) {
          console.log('Friend updated! ');
        return res.status(204).send();
        
    } else {
        return res.status(404).json({ message: 'Friend not found!' });
        
    }

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteFriend = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().collection('friends').deleteOne({ _id: userId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Friend not found.' });
    }
  } catch (err) {
    if (err.name === 'BSONError') {
      return res.status(400).json({
        message: 'Invalid ID format.',
        details: 'The ID must be a valid 24-character hexadecimal string.'
      });
    }
    res.status(500).json({ message: 'Error deleting friend.', error: err.message });
  }
};



module.exports = {getAllData, getSingleById, createFriend, updateFriend, deleteFriend };//exposts the functions to be used by Router