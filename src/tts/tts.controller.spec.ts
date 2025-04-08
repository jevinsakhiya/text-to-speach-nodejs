import { Test, TestingModule } from '@nestjs/testing';
import { TtsController } from './tts.controller';
import { TtsService } from './tts.service';

describe('TtsController', () => {
  let controller: TtsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TtsController],
      providers: [TtsService],
    }).compile();

    controller = module.get<TtsController>(TtsController);
  });

  it('should speak text without throwing error', async () => {
    await expect(controller.tts('Success TTS module')).resolves.toBeUndefined();
  });

  it('should throw error on empty text', async () => {
    await expect(controller.tts('')).rejects.toThrow('Text cannot be empty');
  });
});
