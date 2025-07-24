import TicketDAO from '../daos/mongo/utils/ticket.dao.js';

const ticketDAO = new TicketDAO();

class TicketRepository {
    async createTicket(data) {
        return await ticketDAO.createTicket(data);
    }

    async getTicketById(tid) {
        return await ticketDAO.getTicketById(tid);
    }

    async updateTicket(tid, data) {
        return await ticketDAO.updateTicket(tid, data);
    }

    async deleteTicket(tid) {
        return await ticketDAO.deleteTicket(tid);
    }
}

export default TicketRepository;