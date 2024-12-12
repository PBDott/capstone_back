// src/email/email.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter;

    constructor(private configService: ConfigService) {
        this.transporter = nodemailer.createTransport({
            host: this.configService.get<string>('EMAIL_HOST'),
            port: this.configService.get<number>('EMAIL_PORT'),
            secure: this.configService.get<boolean>('EMAIL_SECURE'),
            auth: {
                user: this.configService.get<string>('EMAIL_USER'),
                pass: this.configService.get<string>('EMAIL_PASS'),
            },
            logger: true,     // 디버깅용 로거 활성화
            debug: true,      // 디버그 모드 활성화
        });
    }

    async sendClubAcceptanceEmail(to: string): Promise<void> {
        const mailOptions: nodemailer.SendMailOptions = {
            from: this.configService.get<string>('EMAIL_FROM'), // 발신자 주소
            to, // 수신자 주소
            subject: '[여기모여] 동아리 등록이 수락되었습니다.', // 이메일 제목
            text: '동아리 등록 신청이 수락되었습니다. 동아리 관리자 링크: http://capstone-client.s3-website-us-east-1.amazonaws.com'
        };

        try {
            await this.transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('이메일 전송 오류:', error);
            throw new InternalServerErrorException('승인 이메일 전송에 실패했습니다.');
        }
    }


}
