const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');


                        // to get users list in orgs -  GET /api/users/org/:orgId
router.get('/org/:orgId',   usersController.getUsersByOrg);


                                // add user for an org - POST /api/users/org/:orgId
router.post('/org/:orgId', usersController.addUser);

                    // update user (name & role)
router.put('/:id', usersController.updateUser); 

                                        // remove user
  router.delete('/:id ', usersController.deleteUser);


  
  
module.exports = router;
