import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WaitingLineModule } from './waiting-line/waiting-line.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [WaitingLineModule, ConfigModule.forRoot({isGlobal : true})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
