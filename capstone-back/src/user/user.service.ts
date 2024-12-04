import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { ClubService } from 'src/club/club.service';
import { TradeService } from 'src/trade/trade.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly clubService: ClubService,
    private readonly tradeService: TradeService,
  ) { }

  async getUserInfo(userId: number) {
    const { image, ...user } = await this.userRepository.getUserInfo(userId);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { imageId, ...restUserInfo } = user;
    const clubs = await this.clubService.getClubsByJoinedUserId(userId);
    const trades = await this.tradeService.getTradesByUserId(userId);
    return { user: restUserInfo, clubs, trades, profilePic: image.path };
  }
}
