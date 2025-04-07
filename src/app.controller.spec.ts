import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('should return "Hello World!"', () => {
    expect(appController.getHello()).toBe('Hello World!');
  });

  it('should speak text without throwing error', async () => {
    await expect(
      appController.RunTTS('Success TTS module'),
    ).resolves.toBeUndefined();
  });

  it('should throw error on empty text', async () => {
    await expect(appController.RunTTS('')).rejects.toThrow(
      'Text cannot be empty',
    );
  });
});
