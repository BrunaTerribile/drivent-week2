import { getTicketsTypes, getUserTickets, postTicket } from "@/controllers";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter
    .all('/*', authenticateToken)
    .get('/types', getTicketsTypes)
    .get('/', getUserTickets)
    .post('/', postTicket)

export { ticketsRouter };