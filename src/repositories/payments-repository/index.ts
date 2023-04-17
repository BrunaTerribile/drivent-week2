import { prisma } from "@/config";
import { PaymentData } from "@/services/payments-service";
import { TicketStatus } from "@prisma/client";

async function getPayments(ticketId: number) {
    return prisma.payment.findFirst({
        where: { ticketId }
    })
}

async function payTicket(ticketId: number, paymentData: PaymentData) {
    const payment = await prisma.payment.create({
        data: {
            ticketId,
            value: paymentData.value,
            cardIssuer: paymentData.cardIssuer,
            cardLastDigits: paymentData.cardLastDigits
        }
    })

    await prisma.ticket.update({
        where: { id: ticketId },
        data: { status: TicketStatus.PAID }
    })

    return payment;
}

const paymentsRepository = {
    getPayments,
    payTicket
}

export default paymentsRepository;