import { ConfigService } from '@nestjs/config';
import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

import { ValidAudioEnum } from '../dto';

@Injectable()
export class AudioFileValidation implements PipeTransform {
  constructor(private readonly configService: ConfigService) {}

  transform(value: Express.Multer.File, _metadata: ArgumentMetadata) {
    const maxFileSize =
      (this.configService.get<number>('MAX_AUDIO_SIZE') || 0) * Math.pow(10, 6);
    if (value.size > maxFileSize) {
      throw new BadRequestException(
        `Audio file must be lower then or equal to ${maxFileSize}`,
      );
    }
    const validValues: string[] = Object.values(ValidAudioEnum);
    if (!validValues.includes(value.mimetype)) {
      throw new BadRequestException(
        `Audio type must be ${validValues.join(', ')}.`,
      );
    }
    return value;
  }
}
