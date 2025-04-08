import { Test, TestingModule } from '@nestjs/testing';
import { SttController } from './stt.controller';
import { SttService } from './stt.service';
import { SttBindingService } from './stt-binding.service';

describe('SttController', () => {
  let controller: SttController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SttController],
      providers: [SttService, SttBindingService],
    }).compile();

    controller = module.get<SttController>(SttController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('it should print text without throwing error', () => {
    expect(controller.stt()).toBeDefined();
  });
});
