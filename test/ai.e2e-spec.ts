import { ConfigService } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { GoogleGenerativeAI } from '@google/generative-ai';

import { AppModule } from './../src/app.module';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

describe('AI testing', () => {
  let app: INestApplication;
  let configService: ConfigService;
  let speechBase64: string = '';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    configService = moduleFixture.get(ConfigService);

    speechBase64 = await readFile(join(__dirname, './test.wav'), 'base64');
  });

  it('Prompting Google Gemini in Farsi text', async () => {
    const promptString = 'بهترین ژورنال های آی اس آی دنیا کدام اند؟';

    const geminiKey = configService.get<string>('GOOGLE_GEMINI_API_KEY');
    expect(geminiKey).not.toBeNull();
    expect(geminiKey).not.toBeUndefined();

    try {
      const genAI = new GoogleGenerativeAI(geminiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const result = await model.generateContent([promptString]);
      expect(result.response.text()).not.toBeNull();
      expect(result.response.text()).not.toBeUndefined();
    } catch (error) {
      expect(Boolean(error)).toBeFalsy();
    }
  }, 10000);

  it('Prompting Google Gemini in Farsi speech', async () => {
    const geminiKey = configService.get<string>('GOOGLE_GEMINI_API_KEY');
    expect(geminiKey).not.toBeNull();
    expect(geminiKey).not.toBeUndefined();

    try {
      const genAI = new GoogleGenerativeAI(geminiKey);
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
      });

      // Generate content using a prompt and the metadata of the uploaded file.
      const result = await model.generateContent([
        {
          inlineData: {
            mimeType: 'audio/wav',
            data: speechBase64,
          },
        },
        { text: 'Please get me exact voice sentences in farsi' },
      ]);

      await writeFile('test.txt', result.response.text());
      expect(result.response.text()).not.toBeNull();
      expect(result.response.text()).not.toBeUndefined();
    } catch (error) {
      expect(Boolean(error)).toBeFalsy();
    }
  }, 20000);
});
