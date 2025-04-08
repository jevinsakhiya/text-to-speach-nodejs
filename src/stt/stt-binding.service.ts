import { Injectable } from '@nestjs/common';
import * as koffi from 'koffi';
import * as path from 'path';

type VoskModel = unknown;
type VoskRecognizer = unknown;

koffi.opaque('VoskModel');
koffi.opaque('VoskRecognizer');

@Injectable()
export class SttBindingService {
  private readonly libvosk: koffi.IKoffiLib;

  // Strictly typed function bindings
  public readonly vosk_model_new: (path: string) => VoskModel;
  public readonly vosk_model_free: (model: VoskModel) => void;

  public readonly vosk_recognizer_new: (
    model: VoskModel,
    rate: number,
  ) => VoskRecognizer;
  public readonly vosk_recognizer_free: (recognizer: VoskRecognizer) => void;

  public readonly vosk_recognizer_accept_waveform: (
    recognizer: VoskRecognizer,
    data: Buffer,
    length: number,
  ) => number;
  public readonly vosk_recognizer_result: (
    recognizer: VoskRecognizer,
  ) => string;
  public readonly vosk_recognizer_partial_result: (
    recognizer: VoskRecognizer,
  ) => string;
  public readonly vosk_recognizer_final_result: (
    recognizer: VoskRecognizer,
  ) => string;

  constructor() {
    const libPath = path.join(__dirname, './vost/libvosk.dll');
    // console.log('========= lib path ==============');
    // console.log(libPath);
    this.libvosk = koffi.load(libPath);

    this.vosk_model_new = this.libvosk.func(
      'VoskModel* vosk_model_new(const char* path)',
    );
    this.vosk_model_free = this.libvosk.func(
      'void vosk_model_free(VoskModel* model)',
    );

    this.vosk_recognizer_new = this.libvosk.func(
      'VoskRecognizer* vosk_recognizer_new(VoskModel* model, float sample_rate)',
    );
    this.vosk_recognizer_free = this.libvosk.func(
      'void vosk_recognizer_free(VoskRecognizer* recognizer)',
    );

    this.vosk_recognizer_accept_waveform = this.libvosk.func(
      'int vosk_recognizer_accept_waveform(VoskRecognizer* recognizer, const char* data, int length)',
    );

    this.vosk_recognizer_result = this.libvosk.func(
      'const char* vosk_recognizer_result(VoskRecognizer* recognizer)',
    );
    this.vosk_recognizer_partial_result = this.libvosk.func(
      'const char* vosk_recognizer_partial_result(VoskRecognizer* recognizer)',
    );
    this.vosk_recognizer_final_result = this.libvosk.func(
      'const char* vosk_recognizer_final_result(VoskRecognizer* recognizer)',
    );
  }
}
