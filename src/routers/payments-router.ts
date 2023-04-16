import { getPayments, payTicket } from "@/controllers/payments-controller";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const paymentsRouter = Router();

paymentsRouter
    .all('/*', authenticateToken)
    .get('/', getPayments)
    .post('/process', payTicket)

export { paymentsRouter }