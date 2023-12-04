const userModel = require('../../models/user.model.js');

class UserManager {
  async getUsers() {
    try {
      return await userModel.find({}).lean();
    } catch (error) {
      console.error('Error getting users:', error);
      throw error;
    }
  }

  async getById(id) {
    try {
      return await userModel.findOne({ _id: id }).lean();
    } catch (error) {
      console.error('Error getting user by ID:', error);
      throw error;
    }
  }

  async getByEmail(email) {
    try {
      return await userModel.findOne({ email }).lean();
    } catch (error) {
      console.error('Error getting user by email:', error);
      throw error;
    }
  }

  async addUser(user) {
    try {
      return await userModel.create(user);
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  }

  async updateUser(id, user) {
    try {
      return await userModel.updateOne({ _id: id }, user);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  async deleteUser(id) {
    try {
      return await userModel.deleteOne({ _id: id });
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  async changeUserRole(id, newRole) {
    try {
      return await userModel.updateOne({ _id: id }, { role: newRole });
    } catch (error) {
      console.error('Error changing user role:', error);
      throw error;
    }
  }
}

module.exports = new UserManager();
