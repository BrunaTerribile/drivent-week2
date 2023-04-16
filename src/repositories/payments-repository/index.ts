import { prisma } from "@/config";
import { PaymentData } from "@/services/payments-service";

async function getPayments(ticketId: number) {
    return prisma.payment.findFirst({
        where: {ticketId}
    })
}

async function payTicket(paymentData: PaymentData) {
    return prisma.payment.create({
        data: {
            paymentData
        }
    })
}

const paymentsRepository = {
    getPayments,
    payTicket
}

export default paymentsRepository;