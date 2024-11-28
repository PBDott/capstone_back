import { Request as Request_ } from "express";

export type Request = Request_ & {
  payload: {
    userId: number;
    kakaoId: string;
    role: string;
    nickName: string;
  }
};

