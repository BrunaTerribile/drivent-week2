import { prisma } from '@/config';
import { TicketStatus } from '@prisma/client';

async function getTypes() {
  return prisma.ticketType.findMany()
}

async function getTicket(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: { enrollmentId },
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
    },
    include: {
      TicketType: true,
    }
  })
}

async function findTicketWithTypeById(ticketId: number) {
  return prisma.ticket.findFirst({
    where: { id: ticketId },
    include: {
      TicketType: true,
    }
  });
}

async function updateTicket(ticketId: number){
  return prisma.ticket.update({
    where: { id: ticketId },
    data: { status: TicketStatus.PAID }
  })
}

const ticketsRepository = {
    getTypes,
    getTicket,
    postTicket,
    findTicketWithTypeById,
    updateTicket
};

export default ticketsRepository;