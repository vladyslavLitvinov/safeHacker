import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Context, Telegraf } from 'telegraf';

@Injectable()
export class TelegramService {
  private bot;

  constructor(private readonly dbService: DatabaseService) {
    this.bot = new Telegraf(process.env.BOT_TOKEN);
    this.bot.start((ctx: Context) => {
      try {
        dbService.createUser(ctx.message.chat.id, ctx.message.from.language_code);
        ctx.reply('Welcome to hacker city!');
        console.log('Bot started at chat ' + ctx.message.chat.id);
        dbService.changeStatus(ctx.message.chat.id, "change username");
      } catch(e) {
        ctx.reply('User already exist!');
      }
    });

    this.bot.launch();

    process.once('SIGINT', () => this.bot.stop('SIGINT'));
    process.once('SIGTERM', () => this.bot.stop('SIGTERM'));
  }
}
