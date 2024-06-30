import bcrypt from 'bcrypt';

import { User } from "../model";

import { CreateUser } from '../interface/userInterface';
    
  const UserService = {  
    async createUser(newUser: CreateUser){
        const hashPassword = await bcrypt.hash(newUser.password, 10);

        return await User.create({...newUser, password: hashPassword})
    },

    async checkUsername(username:string){
        return await User.findOne({where: {username}})
    },
  
    async getUserById(userId: number, option?: any){
        return await User.findOne({
            where: { id: userId },
            ...option
        })
    },
  
    // async updateUser(id: number, updatedUser: Partial<User>): Promise<User | undefined> {
    //   const index = users.findIndex(user => user.id === id);
    //   if (index === -1) return undefined;
    //   users[index] = { ...users[index], ...updatedUser };
    //   return users[index];
    // },
  
    // async deleteUser(id: number): Promise<void> {
    //   const index = users.findIndex(user => user.id === id);
    //   if (index !== -1) users.splice(index, 1);
    // },
  };
  
  export default UserService;
  