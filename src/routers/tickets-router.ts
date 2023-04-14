import { getTicketsTypes, getUserTickets } from "@/controllers";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter
    .all('/*', authenticateToken)
    .get('/types', getTicketsTypes)
    .get('/', getUserTickets)
    .post('/')

export { ticketsRouter };