import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from './database/database.module';
import { TelegramModule } from './telegram/telegram.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.config/.env',
    }),
    MongooseModule.forRoot(`mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASSWORD}@cluster0.sslaq.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`),
    DatabaseModule,
    TelegramModule,
  ],
})
export class AppModule {}
