import { prisma } from '@/config';
import { Ticket, TicketStatus, TicketType } from '@prisma/client';

async function getTypes(): Promise<TicketType[]> {
  return prisma.ticketType.findMany()
}

async function getTicket(enrollmentId: number): Promise<Ticket & {TicketType: TicketType}> {
  return prisma.ticket.findFirst({
    where: { enrollmentId },
    include: {
      TicketType: true,
    }
  })
}

async function postTicket(ticketTypeId: number, enrollmentId: number): Promise<Ticket & {TicketType: TicketType}>{
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

async function findTicketWithTypeById(ticketId: number): Promise<Ticket & {TicketType: TicketType}> {
  return prisma.ticket.findFirst({
    where: { id: ticketId },
    include: {
      TicketType: true,
    }
  });
}

async function updateTicketStatus(ticketId: number): Promise<Ticket> {
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
    updateTicketStatus
};

export default ticketsRepository;