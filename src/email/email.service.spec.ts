import { Test, TestingModule } from '@nestjs/testing';

import { EmailService } from './email.service';
import { MailerModule, MailerService } from '@nestjs-modules/mailer';

describe('EmailService', () => {
  let service: EmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MailerModule],
      providers: [
        EmailService,
        {
          provide: MailerService,
          useValue: {
            sendMail: jest.fn().mockReturnValue('karl@gmail.com'),
          },
        },
      ],
    }).compile();

    service = module.get<EmailService>(EmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('send email', async () => {
    const expectedOutput = await service.sendEmail({
      email: 'karl@gmail.com',
      subject: 'information',
      html: 'Winter holiday',
    });
    expect(expectedOutput).toContain('karl@gmail.com');
  });
});
