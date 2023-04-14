import { notFoundError } from "@/errors";
import ticketsRepository from "@/repositories/tickets-repository";

async function getTicketsTypes() {
    const result = await ticketsRepository.getTypes()

    if(!result) throw notFoundError();

    return result;
}

const ticketsService = {
    getTicketsTypes
}

export default ticketsService;