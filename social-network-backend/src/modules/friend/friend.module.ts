import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Friends, FriendsSchema } from 'src/schemas/friends.schema';
import { FriendController } from './friend.controller';
import { FriendService } from './friend.service';

@Module({
  imports: [MongooseModule.forFeature([{name: Friends.name, schema: FriendsSchema}])],
  providers: [FriendService],
  controllers: [FriendController],
  exports: [FriendService]
})
export class FriendModule {}
