import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";
import paymentsService from "@/services/payments-service";

export async function getPayments(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const userId = req.userId as number
    const ticketId = +req.query.ticketId as number
    if(!ticketId) return res.sendStatus(httpStatus.BAD_REQUEST)
    
    try {
        const payments = await paymentsService.getPayments(ticketId, userId)
        return res.status(httpStatus.OK).send(payments);
    } catch (error) {
        next(error)
    }
}

export async function payTicket(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const userId = req.userId as number
    const {ticketId, cardData} = req.body
    if(!ticketId || !cardData) return res.sendStatus(httpStatus.BAD_REQUEST)
    
    try {
        const process = await paymentsService.payTicket(ticketId, cardData, userId)
        return res.status(httpStatus.OK).send(process);
    } catch (error) {
        next(error)
    }
}