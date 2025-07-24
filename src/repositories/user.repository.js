import UserDAO from '../daos/mongo/utils/user.dao.js';

const userDAO = new UserDAO();

class UserRepository {
    async createUser(data) {
        return await userDAO.createUser(data);
    }

    async getUserByEmail(email) {
        return await userDAO.getUserByEmail(email);
    }

    async getUserById(uid) {
        return await userDAO.getUserById(uid);
    }

    async updateUser(uid, data) {
        return await userDAO.updateUser(uid, data);
    }

    async deleteUser(uid) {
        return await userDAO.deleteUser(uid);
    }
}

export default UserRepository;