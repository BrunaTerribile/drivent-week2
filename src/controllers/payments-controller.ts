import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";
import paymentsService from "@/services/payments-service";

export async function getPayments(req: AuthenticatedRequest, res: Response) {
    const userId = req.userId as number
    const ticketId = +req.query.ticketId as number
    if(!ticketId) return res.sendStatus(httpStatus.BAD_REQUEST)
    
    try {
        const payments = await paymentsService.getPayments(ticketId, userId)
        return res.status(httpStatus.OK).send(payments);
    } catch (error) {
        return res.sendStatus(httpStatus.NOT_FOUND);
    }
}

export async function payTicket(req: AuthenticatedRequest, res: Response) {
    const {ticketId, cardData} = req.body
    if(!ticketId) return res.sendStatus(httpStatus.BAD_REQUEST)
    
    try {
        const process = await paymentsService.payTicket(ticketId, cardData)
        return res.status(httpStatus.OK).send(process);
    } catch (error) {
        return res.sendStatus(httpStatus.NOT_FOUND);
    }
}