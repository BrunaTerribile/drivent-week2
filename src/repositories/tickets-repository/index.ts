import { prisma } from '@/config';

async function getTypes() {
  return prisma.ticketType.findMany()
}

async function getTicket(userId: number) {
  return prisma.ticket.findMany({
    where: { id: userId }
  })
}

async function postTicket(ticketTypeId: number, enrollmentId: number){
  return prisma.ticket.create({
    data: {
      ticketTypeId,
      enrollmentId,
      status: "RESERVED"
    }
  })
}

const ticketsRepository = {
    getTypes,
    getTicket,
    postTicket
};

export default ticketsRepository;