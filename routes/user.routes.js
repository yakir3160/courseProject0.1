import { Router } from "express";
import {getAllUsers,userActionById} from '../controller/user.controller.js'
const router = Router();

router.get('/',getAllUsers)



router.get('/:id',userActionById);
router.put('/:id', userActionById);
router.delete('/:id', userActionById);
router.put('/upload', userActionById);


export default router