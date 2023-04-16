import { prisma } from "@/config";

async function getPayments(ticketId: number) {
    return prisma.payment.findFirst({
        where: {ticketId}
    })
}

async function payTicket() {

}

const paymentsRepository = {
    getPayments,
    payTicket
}

export default paymentsRepository;