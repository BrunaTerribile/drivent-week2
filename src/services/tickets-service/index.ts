import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketsRepository from "@/repositories/tickets-repository";

async function getTicketsTypes() {
    const result = await ticketsRepository.getTypes()
    if(!result) throw notFoundError();
    return result;
}

async function getUserTickets(userId: number) {
    const result = await ticketsRepository.getTicket(userId)
    if(!result) throw notFoundError();
    return result;
}

async function postTicket(ticketTypeId: number, userId: number) {
    const enrollmentData = await enrollmentRepository.findWithAddressByUserId(userId)
    const enrollmentId = enrollmentData.id
    
    const result = await ticketsRepository.postTicket(ticketTypeId, enrollmentId)
    return result;
}

const ticketsService = {
    getTicketsTypes,
    getUserTickets,
    postTicket
}

export default ticketsService;