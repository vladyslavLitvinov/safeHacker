import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { DatabaseService } from 'src/database/database.service';
import { TelegramService } from './telegram.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    TelegramService,
    DatabaseService
  ]
})
export class TelegramModule {}
