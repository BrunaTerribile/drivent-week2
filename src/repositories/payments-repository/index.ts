import { prisma } from "@/config";
import { PaymentData } from "@/services/payments-service";

async function getPayments(ticketId: number) {
    return prisma.payment.findFirst({
        where: { ticketId }
    })
}

async function payTicket(ticketId: number, paymentData: PaymentData) {
    return prisma.payment.create({
        data: {
            ticketId,
            ...paymentData,
        }
    })
}

const paymentsRepository = {
    getPayments,
    payTicket
}

export default paymentsRepository;