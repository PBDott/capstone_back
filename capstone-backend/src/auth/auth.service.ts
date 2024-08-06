import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async kakaoLogin(KAKAO_API_KEY: string, KAKAO_REDIRECT_URI: string, code: string) {
    const config = {
      grant_type: 'authorization_code',
      client_id: KAKAO_API_KEY,
      redirect_uri: KAKAO_REDIRECT_URI,
      code,
    };
    const params = new URLSearchParams(config).toString();
    
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    };
    const url = `https://kauth.kakao.com/oauth/token`;

    try {
      const response = await axios.post(url, params, { headers });
      const { access_token } = response.data;

      const payload = { access_token };
      const jwt = this.jwtService.sign(payload);

      return jwt;
    } catch (error) {
      console.error('Error response:', error.response?.data || error.message);
      throw error;
    }

  }
}
