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
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                <meta charset="utf-8">
                <title>동아리 등록 수락 알림</title>
                <style>
                    .container {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333333;
                    padding: 20px;
                    background-color: #f4f4f4;
                    }
                    .header {
                    background-color: #4CAF50;
                    color: white;
                    padding: 10px;
                    text-align: center;
                    }
                    .content {
                    margin-top: 20px;
                    }
                    .button {
                    display: inline-block;
                    padding: 10px 20px;
                    margin-top: 20px;
                    font-size: 16px;
                    color: #ffffff;
                    background-color: #4CAF50;
                    text-decoration: none;
                    border-radius: 5px;
                    }
                    .footer {
                    margin-top: 30px;
                    font-size: 12px;
                    color: #777777;
                    text-align: center;
                    }
                </style>
                </head>
                <body>
                <div class="container">
                    <div class="header">
                    <h2>동아리 등록 수락 알림</h2>
                    </div>
                    <div class="content">
                    <p>안녕하세요!</p>
                    <p>귀하의 동아리 등록 신청이 <strong>수락</strong>되었습니다.</p>
                    <p>동아리를 관리하시려면 아래 버튼을 클릭해주세요.</p>
                    <a href="http://capstone-client.s3-website-us-east-1.amazonaws.com" class="button">동아리 관리자 페이지로 이동</a>
                    </div>
                    <div class="footer">
                    <p>본 메일은 발신 전용입니다. 회신하지 마십시오.</p>
                    </div>
                </div>
                </body>
                </html>
            `,
        };

        try {
            await this.transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('이메일 전송 오류:', error);
            throw new InternalServerErrorException('승인 이메일 전송에 실패했습니다.');
        }
    }


}
