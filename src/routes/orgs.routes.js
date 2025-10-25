const express = require('express');
const router = express.Router();
const orgsController = require('../controllers/orgs.controller');

                        // to get orgs list
router.get('/', orgsController.getAllOrgs);

                              // to get org by id
router.get('/:id', orgsController.getOrgById);

                    // to add new org
router.post('/', orgsController.addOrg);


                                    // to update org (full details)
router.put('/:id', orgsController.updateOrg);

// in orgs.routes.js
router.patch('/:id/logo', orgsController.updateOrgLogo);


module.exports = router;
