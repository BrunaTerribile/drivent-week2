import { prisma } from "@/config";
import { PaymentData } from "@/services/payments-service";
import { TicketStatus } from "@prisma/client";

async function getPayments(ticketId: number) {
    return prisma.payment.findFirst({
        where: { ticketId }
    })
}

async function payTicket(ticketId: number, paymentData: PaymentData) {
    await prisma.payment.create({
        data: {
            ticketId,
            ...paymentData,
        }
    })

    await prisma.ticket.update({
        where: { id: ticketId },
        data: { status: TicketStatus.PAID }
    })

    return prisma.payment.findFirst({
        where: { ticketId }
    })
}

const paymentsRepository = {
    getPayments,
    payTicket
}

export default paymentsRepository;