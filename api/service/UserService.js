import User from '../model/User';

class UserService {
    async updateUserByID(id, data) {
        try {
            const user = await User.findByIdAndUpdate(id, data);
            return user;
        } catch (e) {
            throw e;
        }
    }
}

const userService = new UserService();

export default userService
