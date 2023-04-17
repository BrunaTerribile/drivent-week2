import { getPayments, payTicket } from "@/controllers/payments-controller";
import { authenticateToken, validateBody } from "@/middlewares";
import { PaymentDataSchema } from "@/schemas/payments-schemas";
import { Router } from "express";

const paymentsRouter = Router();

paymentsRouter
    .all('/*', authenticateToken)
    .get('/', getPayments)
    .post('/process', validateBody(PaymentDataSchema), payTicket)

export { paymentsRouter }