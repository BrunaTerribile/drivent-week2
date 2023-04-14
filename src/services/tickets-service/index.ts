import { notFoundError } from "@/errors";
import ticketsRepository from "@/repositories/tickets-repository";

async function getTicketsTypes() {
    const result = await ticketsRepository.getTypes()

    if(!result) throw notFoundError();

    return result;
}

async function getUserTickets(userId: number) {
    const result = await ticketsRepository.getTicket(userId)

    return result;
}

const ticketsService = {
    getTicketsTypes,
    getUserTickets
}

export default ticketsService;