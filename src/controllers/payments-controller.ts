import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";
import paymentsService from "@/services/payments-service";
import { Payment } from "@prisma/client";

export async function getPayments(req: AuthenticatedRequest, res: Response) {
    const ticketId = Number(req.query.ticketId)
    
    try {
        const payments = await paymentsService.getPayments(ticketId)

        return res.status(httpStatus.OK).send(payments);
    } catch (error) {
        return res.sendStatus(httpStatus.NOT_FOUND);
    }
}

export async function payTicket(req: AuthenticatedRequest, res: Response) {
    const {ticketId, cardData} = req.body
    const userId = req.userId
    
    try {
        const process = await paymentsService.payTicket(ticketId, cardData, userId)

        return res.status(httpStatus.OK).send(process);
    } catch (error) {
        return res.sendStatus(httpStatus.NOT_FOUND);
    }
}