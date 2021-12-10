import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  money: number;

  @Prop()
  language: string;

  @Prop()
  passwords: string[];

  @Prop()
  chat: number;

  @Prop()
  status: string;
}

export const UserSchema = SchemaFactory.createForClass(User);