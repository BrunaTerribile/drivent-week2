import { notFoundError } from "@/errors";
import paymentsRepository from "@/repositories/payments-repository";
import ticketsRepository from "@/repositories/tickets-repository";
import { Payment } from "@prisma/client";

async function getPayments(ticketId: number) {
    const result = await paymentsRepository.getPayments(ticketId)
    if(!result) throw notFoundError();
    return result;
}

export type PaymentData = Omit<Payment, 'id' |'createdAt' | 'updatedAt'>;

export type CardData = {
    issuer: string,
    number: number,
    name: string,
    expirationDate: Date,
    cvv: number
}

async function payTicket(ticketId: number, cardData: CardData, userId: number) {
    const ticketData = await ticketsRepository.getTicket(userId)
    
    const paymentData: PaymentData = {
        ticketId,
        cardIssuer: cardData.issuer,
        cardLastDigits: cardData.number.toString().slice(-4)
    }
    
    const result = await paymentsRepository.payTicket(paymentData)
    if(!result) throw notFoundError();
    return result;
}

const paymentsService = {
    getPayments,
    payTicket
}

export default paymentsService;