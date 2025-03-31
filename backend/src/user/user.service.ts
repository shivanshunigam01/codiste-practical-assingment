import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class UserService {
  constructor(private dataSource: DataSource) {}

  async registerUser(name: string, email: string, password: string) {
    return this.dataSource.query('CALL usp_registerUser(?, ?, ?)', [name, email, password]);
  }

  async loginUser(email: string, password: string) {
    const result = await this.dataSource.query('CALL usp_loginUser(?, ?)', [email, password]);

    if (!result || result.length === 0 || !result[0] || result[0].length === 0) {
      throw new NotFoundException('User not found');
    }

    return result[0][0]; 
  }

  async getUserProfile(userId: number) {
    const result = await this.dataSource.query('CALL usp_getUserProfile(?)', [userId]);

    if (!result || result.length === 0 || !result[0] || result[0].length === 0) {
      throw new NotFoundException('User not found');
    }

    return result[0][0]; 
  }

  async editUserName(userId: number, name: string) {
    if (!name || name.trim() === '') {
      throw new BadRequestException('Name cannot be empty');
    }

    const result = await this.dataSource.query('CALL usp_editUserName(?, ?)', [userId, name]);

    console.log("Result getting for update ", result)

    if (!result || result.affectedRows === 0) {
      throw new NotFoundException('User not found or name update failed');
    }

    return { message: 'User name updated successfully' };
  }
}