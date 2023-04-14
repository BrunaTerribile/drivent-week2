import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";
import ticketsService from "@/services/tickets-service";

export async function getTicketsTypes(req: AuthenticatedRequest, res: Response) {
    try {
        const types = await ticketsService.getTicketsTypes()

        return res.status(httpStatus.OK).send(types);
    } catch (error) {
        return res.sendStatus(httpStatus.NOT_FOUND);
    }
}

export async function getUserTickets(req: AuthenticatedRequest, res: Response) {
    const userId = req.userId

    try {
        const ticket = await ticketsService.getUserTickets(userId)

        return res.status(httpStatus.OK).send(ticket);
    } catch (error) {
        return res.sendStatus(httpStatus.NOT_FOUND);
    }
}