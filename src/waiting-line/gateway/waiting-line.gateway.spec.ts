import { Test, TestingModule } from '@nestjs/testing';
import { WaitingLineGateway } from './waiting-line.gateway';

describe('WaitingLineGateway', () => {
  let gateway: WaitingLineGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WaitingLineGateway],
    }).compile();

    gateway = module.get<WaitingLineGateway>(WaitingLineGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
