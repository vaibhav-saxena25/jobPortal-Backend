import express from 'express';
import userAuth from '../middlewares/authMiddleware.js';
import { updateUserController } from '../controllers/userController.js';

//router
const router = express.Router();

//router
//Get Users || Get

//update user || put
router.put('/update-user',userAuth,updateUserController)

export default router