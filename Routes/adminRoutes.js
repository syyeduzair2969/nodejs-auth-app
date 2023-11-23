const express = require('express');
const hrControle = require('./../Controllers/hrController');
const authControler=require('./../Controllers/authController');
const empControle = require('./../Controllers/empControllers');
const router = express.Router();

router.route('/employees').get( authControler.protect,authControler.userAdmin('admin'),empControle.getAllEmp);
router.route('/employees/:id').patch(authControler.protect,authControler.userAdmin('admin'),empControle.updateStatus);


module.exports = router;