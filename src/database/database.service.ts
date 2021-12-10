import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class DatabaseService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async createUser(chatId: number, language: string = 'en'): Promise<User> {
    if (await this.findUserByChatId(chatId)) {
      throw new Error("User already exist");
    }
    const user = {
        money: 1000,
        passwords: [],
        language,
        chat: chatId,
    }
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async findUserByChatId(chatId: number): Promise<User> {
    return this.userModel.findOne({ chat: chatId });
  }

  async updateUsername(chatId: number, username: string) {
    this.userModel.findOneAndUpdate({ chat: chatId }, { username });
  }

  async changeStatus(chatId: number, status: string) {
    this.userModel.findOneAndUpdate({ chat: chatId }, { status });
  }
}
