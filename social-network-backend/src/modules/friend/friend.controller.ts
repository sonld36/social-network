import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FriendService } from './friend.service';

@Controller('friend')
export class FriendController {
  constructor(private friendService: FriendService) {}
  
  @UseGuards(JwtAuthGuard)
  @Get("list")
  getListFriend(@Request() req) {
    return this.friendService.getListFriend(req.user.userId);
  }
}
