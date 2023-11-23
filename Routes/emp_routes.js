const express = require('express');
const empControle = require('./../Controllers/empControllers');
const adminControle = require('./../Controllers/adminController');
const hrControle = require('./../Controllers/hrController');
const userControle = require('./../Controllers/userController');
const authControler=require('./../Controllers/authController');
const router = express.Router();


router.route('/employees').get(authControler.protect,authControler.userRole('admin','hr'),empControle.getAllEmp);
router.route('/admin').get(authControler.protect,authControler.userAdmin('admin'),adminControle.getAllAdmin);
router.route('/hr').get(authControler.protect,hrControle.getAllHr);

router.route('/register').post( authControler.protect,authControler.userRequest('user'),empControle.registerRequest);
// router.route('/users').get(userControle.getAllUsers);
// router.route('/users/register').post( userControle.creatUsers);

// router.route('/login')
// .get(userControle.getUserlogin);
//     router.route('/employees/:name')
//     .get(empControle.getEmp)
    //.patch(moviesController.updateMovie)
   // .delete(moviesController.deleteMovie)


module.exports = router;