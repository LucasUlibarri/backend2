import ticketModel from '../models/ticket.model.js';

class TicketDAO {
    async getTickets() {
        try {
            let result = await ticketModel.find({});
            return result;
        } catch (error) {
            console.error({ error });
            return null;
        }
    }

    async getTicketById(tid) {
        try {
            let result = await ticketModel.findOne({ _id: tid }).populate('products.product');
            return result;
        } catch (error) {
            console.error({ error });
            return null;
        }
    }

    async saveTicket(ticket) {
        try {
            let result = await ticketModel.create(ticket);
            return result;
        } catch (error) {
            console.error({ error });
            return null;
        }
    }

    async updateTicket(tid, obj) {
        try {
            let result = await ticketModel.updateOne({ _id: tid }, { $set: obj });
            return result;
        } catch (error) {
            console.error({ error });
            return null;
        }
    }

    async deleteTicket(tid) {
        try {
            let result = await ticketModel.deleteOne({ _id: tid });
            return result;
        } catch (error) {
            console.error({ error });
            return null;
        }
    }
}

export default TicketDAO;