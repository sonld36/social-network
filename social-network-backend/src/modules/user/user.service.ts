import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { User, UserDocument, UserSchema } from "src/schemas/user.schema";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";
import { Model } from "mongoose"
import { InjectModel } from "@nestjs/mongoose";
import { InformationUserDto } from "src/dtos/user.dto";
import { FriendService } from "../friend/friend.service";


@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, 
    private friendService: FriendService) {}

  async findUserById(idUser: string): Promise<User> {
    return await this.userModel.findById(idUser).exec();
  }

  async updateUserById(idUser: string, user: User): Promise<User> {
    return await this.userModel.findByIdAndUpdate({_id: idUser}, user, {new: true}).exec();   
  }

  async updateInforDetail(idUser: string, inforDetail: InformationUserDto): Promise<User> {
    return this.findUserById(idUser).then(async user => {
      user["_doc"] = {
        ...user["_doc"],
        inforDetail: inforDetail
      };
      return this.updateUserById(idUser, user);  
    });   
  }

  async uploadAvatar(idUser: string, path: string): Promise<any> {
    return this.findUserById(idUser).then(user => {
      user["_doc"] = {
        ...user["_doc"],
        avatar: path
      }
      
      return this.updateUserById(idUser, user);
    }).catch(err => {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    })
  }


  async deleteUser(idUser: string): Promise<any> {
    return this.userModel.findByIdAndDelete(idUser)
      .then(user => {
        return user._id;
      })
      .catch(err => {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      })
  }

  async sendFriendInvitation(idUserReq: string, idUserReceive: string): Promise<any> {
    return await this.friendService.makeRequestToFriend(idUserReq, idUserReceive)
      .then(async (data) => {
        if(data) {
          return data;
        }

        throw new HttpException("The relationship was existed", HttpStatus.BAD_REQUEST);
      });
  }

  async acceptRequestFriend(idUserAccept: string, idUserReq: string): Promise<any> {
    if(idUserAccept === idUserReq) {
      throw new HttpException("the both of user have the same id", HttpStatus.BAD_REQUEST);
    }
    return await this.friendService.acceptRequestFriend(idUserAccept, idUserReq)
      .then(async (data) => {
        if(data) {
          return data;
        }

        throw new HttpException("The relationship was not existed", HttpStatus.BAD_REQUEST);
      })
  }
}
