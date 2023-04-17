import { prisma } from "@/config";
import { PaymentData } from "@/services/payments-service";
import { Payment } from "@prisma/client";

async function getPayments(ticketId: number): Promise<Payment> {
    return prisma.payment.findFirst({
        where: { ticketId }
    })
}

async function payTicket(ticketId: number, paymentData: PaymentData): Promise<Payment> {
    return prisma.payment.create({
        data: {
            ticketId,
            ...paymentData
        }
    })
}

const paymentsRepository = {
    getPayments,
    payTicket
}

export default paymentsRepository;