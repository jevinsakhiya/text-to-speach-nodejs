import { Injectable } from '@nestjs/common';
import * as mic from 'mic';
import * as koffi from 'koffi';
import * as path from 'path';
import { Duplex } from 'stream';
import * as fs from 'fs';

const SAMPLE_RATE = 16000;
const model_path = './vost/model'; // Use absolute path
type Pointer = Buffer;

@Injectable()
export class SttService {
  listenAndTranscribe() {
    const libPath = path.join(__dirname, './vost/libvosk.dll');
    const MODEL_PATH = path.join(__dirname, model_path);
    const vosk = koffi.load(libPath);

    const VoskModel = koffi.pointer('void');
    const VoskRecognizer = koffi.pointer('void');
    const VoidPtr = koffi.pointer('void');

    const vosk_model_new: (modelPath: string) => Pointer = vosk.func(
      'vosk_model_new',
      VoskModel,
      ['string'],
    );

    const vosk_model_free: (model: Pointer) => void = vosk.func(
      'vosk_model_free',
      'void',
      [VoskModel],
    );

    const vosk_recognizer_new: (model: Pointer, sampleRate: number) => Pointer =
      vosk.func('vosk_recognizer_new', VoskRecognizer, [VoskModel, 'float']);

    const vosk_recognizer_accept_waveform = vosk.func(
      'vosk_recognizer_accept_waveform',
      'int',
      [VoskRecognizer, VoidPtr, 'int'],
    );

    const vosk_recognizer_result: (recognizer: Pointer) => string = vosk.func(
      'vosk_recognizer_result',
      'string',
      [VoskRecognizer],
    );

    const vosk_recognizer_free: (recognizer: Pointer) => void = vosk.func(
      'vosk_recognizer_free',
      'void',
      [VoskRecognizer],
    );

    const model = vosk_model_new(MODEL_PATH);
    const recognizer = vosk_recognizer_new(model, SAMPLE_RATE);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const micInstance = mic({
      rate: '16000',
      channels: '1',
      debug: true,
      device: 'default', // Default system mic
      encoding: 'signed-integer',
      endian: 'little',
      bitwidth: '16',
      fileType: 'raw',
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const micInputStream: Duplex = micInstance.getAudioStream();

    // DEBUG FILE OUTPUT — verify what's being recorded
    const debugOut = fs.createWriteStream('debug_output.raw');
    // micInputStream.pipe(debugOut);

    micInputStream.on('data', (data: Buffer) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const accepted = vosk_recognizer_accept_waveform(
        recognizer,
        data,
        data.length,
      );
      if (accepted) {
        const result = vosk_recognizer_result(recognizer);
        try {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          // const parsed = JSON.parse(result);
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          console.log('📝 Result:', result);
        } catch (err: unknown) {
          if (err instanceof Error) {
            console.error('JSON parse error:', err.message);
          } else {
            console.error('Unknown error:', err);
          }
        }
      }
    });

    micInputStream.on('error', (err: unknown) => {
      if (err instanceof Error) {
        console.error('Mic error:', err.message);
      } else {
        console.error('Mic unknown error:', err);
      }
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    micInstance.start();
    console.log('🎙️ Speak now...');

    // Stop listening after 10 seconds
    setTimeout(() => {
      console.log('⏹️ Stopping mic');
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      micInstance.stop();
      vosk_recognizer_free(recognizer);
      vosk_model_free(model);
      debugOut.close();
    }, 10000);
  }
}
