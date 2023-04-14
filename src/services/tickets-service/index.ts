import { notFoundError } from "@/errors";
import ticketsRepository from "@/repositories/tickets-repository";

async function getTicketsTypes() {
    const result = await ticketsRepository.getTypes()

    if(!result) throw notFoundError();

    return result;
}

async function getUserTickets() {
    const result = await ticketsRepository.getTicket()

    return result;
}

const ticketsService = {
    getTicketsTypes,
    getUserTickets
}

export default ticketsService;