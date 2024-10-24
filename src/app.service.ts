import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { ValidLanguagesEnum } from 'libs/common/dto';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  public async prompt(input: string): Promise<{ result: string }> {
    const geminiKey = this.configService.get<string>('GOOGLE_GEMINI_API_KEY');
    try {
      const genAI = new GoogleGenerativeAI(geminiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const result = await model.generateContent([input]);
      return { result: result.response.text() };
    } catch (error) {
      throw new InternalServerErrorException(
        'Something went wrong, contact admin.',
      );
    }
  }

  public async stt(
    data: string,
    mimeType: string,
    lang = ValidLanguagesEnum.FA,
  ): Promise<{ result: string }> {
    const geminiKey = this.configService.get<string>('GOOGLE_GEMINI_API_KEY');
    try {
      const genAI = new GoogleGenerativeAI(geminiKey);
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
      });
      // Generate content using a prompt and the metadata of the uploaded file.
      const result = await model.generateContent([
        {
          inlineData: {
            mimeType,
            data,
          },
        },
        { text: `Please write exact ${lang} audio sentences for me` },
      ]);
      return { result: result.response.text() };
    } catch (error) {
      throw new InternalServerErrorException(
        'Something went wrong, contact admin.',
      );
    }
  }
}
