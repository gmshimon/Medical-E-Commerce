import express from 'express';
import verifyLoginToken from '../../middleware/Token/verifyToken';
import orderController from './order.controller';
const router = express.Router();

router.delete('/delete-order/:id',verifyLoginToken,orderController.deleteOrder)
router.put('/change-status',verifyLoginToken,orderController.changeStatus)
router.get('/my-order',verifyLoginToken,orderController.getMyOrder)
router.post('/',verifyLoginToken,orderController.createOrder)
router.get('/get-orders',verifyLoginToken,orderController.getAllOrders)

export default router