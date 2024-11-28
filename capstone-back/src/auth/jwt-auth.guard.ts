import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser = any>(err: any, user: any, info: any, context: ExecutionContext, status?: any): TUser {
    const request = context.switchToHttp().getRequest();

    if (user) {
      request.payload = user;
    }
    const userInfo = super.handleRequest(err, user, info, context, status);
    return userInfo;
  }
}
