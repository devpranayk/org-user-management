const express = require('express') ;
const router = express.Router() ;
const usersController = require('../controllers/users.controller') ;

// get users for org
router.get('/org/:orgId' , usersController.getUsersByOrg) ;

// add user
router.post('/' , usersController.addUser) ;

// update user
router.put('/:id' , usersController.updateUser) ;

// remove user
router.delete('/:id' , usersController.deleteUser) ;

module.exports = router ;
