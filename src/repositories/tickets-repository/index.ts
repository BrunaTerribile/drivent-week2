import { prisma } from '@/config';

async function getTypes() {
  return prisma.ticketType.findMany()
}

async function getTicket() {
  return prisma.ticket.findMany()
}

const ticketsRepository = {
    getTypes,
    getTicket
};

export default ticketsRepository;