import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";
import paymentsService from "@/services/payments-service";

export async function getPayments(req: AuthenticatedRequest, res: Response) {
    try {
        const payments = await paymentsService.getPayments()

        return res.status(httpStatus.OK).send(payments);
    } catch (error) {
        return res.sendStatus(httpStatus.NOT_FOUND);
    }
}

export async function payTicket(req: AuthenticatedRequest, res: Response) {
    try {


        return res.status(httpStatus.OK).send();
    } catch (error) {
        return res.sendStatus(httpStatus.NOT_FOUND);
    }
}