import { Request, Response } from 'express';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import UserService from '../service/userService';
import { successResponse, errorResponse } from '../helper/response';

const UserController = {
  // async getAllUsers(req: Request, res: Response) {
  //   try {
  //     const users = await UserService.getAllUsers();
  //     res.json(users);
  //   } catch (error: any) { // Explicitly specify the type of 'error'
  //     res.status(500).json({ message: error.message });
  //   }
  // },

  async createUser(req: Request, res: Response) {
    try {
      const { username } =req.body

      const checkDuplicateUsername = await UserService.checkUsername(username)

      if(checkDuplicateUsername) return res.status(409).json(errorResponse('Username already exists, please try another username')); 

      const newUser = await UserService.createUser(req.body);
      
      const userObject: { [key: string]: any } = newUser.toJSON();

      // Check if the password property exists before deleting it
      if (userObject.password) {
          delete userObject.password;
      }
      
      res.json(successResponse('User created successfully', userObject))
    } catch (error: any) {
      res.status(500).json(errorResponse('An error occurred while creating the user', error.message));
    }
  },

  async loginUser(req: Request, res: Response) {
    try {
      const { username, password } =req.body

      const user = await UserService.checkUsername(username)
      if(!user) return res.status(401).json(errorResponse('Invalid username or password')); 

      const passwordMatch = await compare(password, user.password);
      if(!passwordMatch) return res.status(401).json(errorResponse('Invalid username or password')); 

      const token = sign({ userId: user.id, role: user.role }, `${process.env.JWT_SECRET_KEY}`, { expiresIn: `${process.env.JWT_EXPIRES_IN}` });

      const userObject: { [key: string]: any } = user.toJSON();

      if (userObject.password) {
          delete userObject.password;
      }

      res.json(successResponse('Login successful', { ...userObject, token }));
    } catch (error: any) {
      res.status(500).json(errorResponse('An error occurred while logging in', error.message));
    }
  },

  async getUserById(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.id);
      const user = await UserService.getUserById(userId, {attributes: {exclude: ['password']}});

      if(!user) return res.status(404).json(errorResponse('User not found'))

      res.json(successResponse('User retrieved successfully', user))
    } catch (error: any) {
      res.status(500).json(errorResponse('An error occurred while retrieving the user', error.message));
    }
  },

  // async updateUser(req: Request, res: Response) {
  //   try {
  //     const userId = parseInt(req.params.id, 10);
  //     const updatedUser = await UserService.updateUser(userId, req.body);
  //     res.json(updatedUser);
  //   } catch (error: any) { // Explicitly specify the type of 'error'
  //     res.status(500).json({ message: error.message });
  //   }
  // },

  // async deleteUser(req: Request, res: Response) {
  //   try {
  //     const userId = parseInt(req.params.id, 10);
  //     await UserService.deleteUser(userId);
  //     res.sendStatus(204);
  //   } catch (error: any) { // Explicitly specify the type of 'error'
  //     res.status(500).json({ message: error.message });
  //   }
  // },
};

export default UserController;
