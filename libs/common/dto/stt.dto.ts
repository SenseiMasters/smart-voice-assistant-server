import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export enum ValidAudioEnum {
  WAV = 'audio/wav',
  MP3 = 'audio/mp3',
  AIFF = 'audio/aiff',
  AAC = 'audio/aac',
  OGG = 'audio/ogg',
  FLAC = 'audio/flac',
}
