import { prisma } from '@/config';

async function getTypes() {
  return prisma.ticketType.findMany()
}

async function getTicket(userId: number) {
  return prisma.ticket.findMany({
    where: { id: userId }
  })
}

const ticketsRepository = {
    getTypes,
    getTicket
};

export default ticketsRepository;