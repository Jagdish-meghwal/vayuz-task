import express from 'express';
import {register, addUserDeatail} from '../controllers/users.js'
const router = express.Router();

/* GET users listing. */
router.post('/register',register);
router.post('/adduserdeatail/:id',addUserDeatail);


export default router;