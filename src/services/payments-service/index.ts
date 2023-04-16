import { notFoundError } from "@/errors";
import paymentsRepository from "@/repositories/payments-repository";

async function getPayments(ticketId: number) {
    const result = await paymentsRepository.getPayments(ticketId)
    if(!result) throw notFoundError();
    return result;
}

async function payTicket() {
    
}

const paymentsService = {
    getPayments,
    payTicket
}

export default paymentsService;