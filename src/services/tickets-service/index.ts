import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketsRepository from "@/repositories/tickets-repository";

async function getTicketsTypes() {
    const result = await ticketsRepository.getTypes()
    if(!result) throw notFoundError();
    return result;
}

async function getUserTickets(userId: number) {
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId)
    const result = await ticketsRepository.getTicket(enrollment.id)

    if(!result || !enrollment) throw notFoundError();
    return result;
}

async function postTicket(ticketTypeId: number, userId: number) {
    const enrollmentData = await enrollmentRepository.findWithAddressByUserId(userId)
    const result = await ticketsRepository.postTicket(ticketTypeId, enrollmentData.id)

    if(!result || !enrollmentData) throw notFoundError();
    return result;
}

const ticketsService = {
    getTicketsTypes,
    getUserTickets,
    postTicket
}

export default ticketsService;