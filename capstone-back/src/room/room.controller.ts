import { BadRequestException, Controller, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import { RoomService } from "./room.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Request } from "src/common/user.interface";

@Controller(':type/:id/room')
export class RoomController {
  constructor(
    private readonly roomService: RoomService,
  ) { }

  @Get()
  @UseGuards(JwtAuthGuard)
  async connectRoom(
    @Req() req: Request,
    @Query('sId') socketId: string
  ) {
    const { type, id } = req.params;
    if (type !== 'club' && type !== 'trade') {
      throw new BadRequestException();
    }
    if (!socketId) {
      throw new BadRequestException();
    }
    // [TODO] use userId? kakaoId?
    const { userId, nickName } = req.payload;
    const roomInfo = await this.roomService.connect({
      type,
      id: parseInt(id),
      userId,
      nickName,
      socketId,
    });
    return roomInfo;
  }

  @Post('leave')
  @UseGuards(JwtAuthGuard)
  async leaveRoom(
    @Req() req: Request,
    @Query('sId') socketId: string,
  ) {
    const { type, id } = req.params;
    if (type !== 'club' && type !== 'trade') {
      throw new BadRequestException();
    }
    if (!socketId) {
      throw new BadRequestException('socket id missing');
    }
    const { userId, nickName } = req.payload;
    const roomId = `${type}:${id}`;
    this.roomService.leaveRoom({ roomId, userId, socketId, nickName })
  }
}
