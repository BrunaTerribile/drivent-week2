import { notFoundError, unauthorizedError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import paymentsRepository from "@/repositories/payments-repository";
import ticketsRepository from "@/repositories/tickets-repository";
import { Payment } from "@prisma/client";

async function getPayments(ticketId: number, userId: number) {
    const ticket = await ticketsRepository.findTicketWithTypeById(ticketId)
    if(!ticket) throw notFoundError();

    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId)
    if(enrollment.id !== ticket.enrollmentId) throw unauthorizedError();

    const result = await paymentsRepository.getPayments(ticketId)
    return result;
}

export type PaymentData = Omit<Payment, 'id' | 'ticketId' |'createdAt' | 'updatedAt'>;

export type CardData = {
    issuer: string,
    number: number,
    name: string,
    expirationDate: Date,
    cvv: number
}

async function payTicket(ticketId: number, cardData: CardData, userId: number) {
    const ticket = await ticketsRepository.getTicket(ticketId)
    if(!ticket) throw notFoundError();

    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId)
    if(enrollment.id !== ticket.enrollmentId) throw unauthorizedError();

    const paymentData: PaymentData = {
        value: ticket.TicketType.price,
        cardIssuer: cardData.issuer,
        cardLastDigits: cardData.number.toString().slice(-4)
    }
    
    const result = await paymentsRepository.payTicket(ticketId, paymentData)
    await ticketsRepository.updateTicketStatus(ticketId)
    return result;
}

const paymentsService = {
    getPayments,
    payTicket
}

export default paymentsService;