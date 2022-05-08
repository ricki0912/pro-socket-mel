import { Module } from '@nestjs/common';
import { WaitingLineGateway } from './gateway/waiting-line.gateway';

@Module({
  providers: [WaitingLineGateway]
})
export class WaitingLineModule {}
