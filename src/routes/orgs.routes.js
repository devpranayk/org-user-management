const express = require('express') ;
const router = express.Router() ;
const orgsController = require('../controllers/orgs.controller') ;

// get all orgs
router.get('/' , orgsController.getAllOrgs) ;

// get org by id
router.get('/:id' , orgsController.getOrgById) ;

// add new org
router.post('/' , orgsController.addOrg) ;

// update org
router.put('/:id' , orgsController.updateOrg) ;

module.exports = router ;
