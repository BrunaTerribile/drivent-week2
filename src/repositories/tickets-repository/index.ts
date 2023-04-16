import { prisma } from '@/config';
import { TicketStatus } from '@prisma/client';

async function getTypes() {
  return prisma.ticketType.findMany()
}

async function getTicket(userId: number) {
  return prisma.ticket.findMany({
    where: { id: userId },
    include: {
      TicketType: true,
    }
  })
}

async function postTicket(ticketTypeId: number, enrollmentId: number){
  return prisma.ticket.create({
    data: {
      ticketTypeId,
      enrollmentId,
      status: TicketStatus.RESERVED
    }
  })
}

async function findTicketWithTypeById(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      TicketType: true,
    }
  });
}

const ticketsRepository = {
    getTypes,
    getTicket,
    postTicket,
    findTicketWithTypeById
};

export default ticketsRepository;