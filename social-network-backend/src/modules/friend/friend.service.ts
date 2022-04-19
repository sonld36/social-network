import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Friends, FriendsDocument } from 'src/schemas/friends.schema';
import { Model } from "mongoose"
import { FriendStatus } from 'src/commons/friendStatus.enum';

@Injectable()
export class FriendService {
  constructor(@InjectModel(Friends.name) private friendModel: Model<FriendsDocument>) {}

  async makeRequestToFriend(idUserReq: string, idUserReceive: string): Promise<any> {
    const check = await this.friendModel.find({ 
      $or: [
        { $and: [{ requester: idUserReq }, { receivers: idUserReceive }] },
        { $and: [{ requester: idUserReceive }, { receivers: idUserReq }] }
      ]
     }).exec();
    if(check.length === 0) {
      return await this.friendModel.create({
        requester: idUserReq,
        receivers: idUserReceive,
        status: FriendStatus.Req
      });
    }
    return null;
  }

  async acceptRequestFriend(idUserAccept: string, idUserReq: string): Promise<any> {
    const checkExist = await this.friendModel.findOne({ requester: idUserReq, receivers: idUserAccept })
      .exec();

    if(checkExist && checkExist.status === FriendStatus.Req) {
      return await checkExist.updateOne({ $set: { status: FriendStatus.Friend } }, { new: true })
        .then(data => {
          return data;
        });
    }

    return null;
  }

  async getListFriend(idUser: string): Promise<any> {
    return await this.friendModel.find({ $and: [
        { $or: [{ receivers: idUser }, { requester: idUser }] },
        { status: FriendStatus.Friend }
      ]})
      .populate("requester", ["lastname", "firstname", "email"])
      .populate("receivers", ["lastname", "firstname", "email"])
      .lean()
      .then(friends => {
        const resFriend = friends.map(friend => {
          if(friend.receivers["_id"].valueOf() === idUser) {
            delete friend.receivers;
            return friend.requester;
          }
          else {
            delete friend.requester;
            return friend.receivers;
          }
          
        });

        return resFriend;
      });
  }
}
