import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
@Injectable()
export class TtsService {
  async tts(text: string): Promise<void> {
    if (!text) throw new Error('Text cannot be empty');
    const command = `espeak "${text.replace(/"/g, '\\"')}"`;
    try {
      await execAsync(command);
    } catch (error) {
      throw new Error('Failed to run eSpeak: ' + error);
    }
  }
}
