import api from './api';
import { UserDto } from '../dto/userDto';


//Fetches all users from the API 
export const getUsers = async () => {
  try {
    const response = await api.get('/auth/users');
    
    if (!response.data) {
      throw new Error('No data received from server');
    }

    return response.data.map(user => 
      new UserDto(
        user.id,
        user.username,
        user.email,
        user.createdAt,
        user.updatedAt 
      )
    );
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch users');
  }
};


//Fetches a single user by ID
export const getUserById = async (id) => {
  try {
    if (!id) {
      throw new Error('User ID is required');
    }

    const response = await api.get(`/auth/users/${id}`);
    
    if (!response.data) {
      throw new Error('User not found');
    }

    return new UserDto(
      response.data.id,
      response.data.username,
      response.data.email,
      response.data.createdAt,
      response.data.updatedAt 
    );
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error);
    throw new Error(error.response?.data?.message || 'Failed to fetch user');
  }
};

//Create a new user
export const createUser = async (userData) => {
  try {
    const response = await api.post('/auth/users', userData);
    return new UserDto(
      response.data.id,
      response.data.username,
      response.data.email,
      response.data.createdAt
    );
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error(error.response?.data?.message || 'Failed to create user');
  }
};

// Update user
export const updateUser = async (id, updateData) => {
  try {
    const response = await api.patch(`/auth/users/${id}`, updateData);
    return new UserDto(
      response.data.id,
      response.data.username,
      response.data.email,
      response.data.createdAt,
      response.data.updatedAt
    );
  } catch (error) {
    console.error(`Error updating user ${id}:`, error);
    throw new Error(error.response?.data?.message || 'Failed to update user');
  }
};

//Delete user
export const deleteUser = async (id) => {
  try {
    await api.delete(`/auth/users/${id}`);
    return true;
  } catch (error) {
    console.error(`Error deleting user ${id}:`, error);
    throw new Error(error.response?.data?.message || 'Failed to delete user');
  }
};