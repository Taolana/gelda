'use server'

import { eq, desc } from 'drizzle-orm'

import { response } from '@/server/lib/helpers'
import { database } from '@/server/config/database'
import { tickets } from '@/server/config/schema'
import { TicketInformationType } from '@/lib/definitions'
import { ticketFormSchemaValidator } from '@/server/lib/validators'

export const getAll = async () => {
  try {
    const data = await database.query.tickets.findMany({
      with: {
        status: true,
        priority: true,
        resolution: true,
        creator: true
      }
    })
    return response(true, 'Tickets fetched successfully', data)
  } catch (error) {
    return response(false, 'An error occurred while fetching tickets')
  }
}

export const getUserTickets = async (userId: string) => {
  try {
    const data = await database.query.tickets.findMany({
      where: eq(tickets.creatorId, userId),
      with: {
        status: true,
        priority: true,
        resolution: true
      },
      orderBy: [desc(tickets.createdAt)],
      limit: 7
    })
    return response(true, 'Tickets fetched successfully', data)
  } catch (error) {
    return response(false, 'An error occurred while fetching tickets')
  }
}

export const getById = async (id: string) => {
  try {
    const data = await database.query.tickets.findFirst({
      where: eq(tickets.id, id),
      with: {
        status: true,
        priority: true,
        resolution: true
      }
    })
    return response(true, 'Ticket fetched successfully', data)
  } catch (error) {
    return response(false, 'An error occurred while fetching a ticket')
  }
}

export const create = async (form: TicketInformationType) => {
  const { success } = ticketFormSchemaValidator.safeParse(form)
  if (!success) {
    return response(
      false,
      'Submission failed: The provided data does not meet the required specifications. Please review and try again.'
    )
  }

  try {
    const data = await database.insert(tickets).values(form)
    return response(true, 'Ticket created successfully', data)
  } catch (error) {
    return response(false, 'An error occurred while creating a ticket')
  }
}
