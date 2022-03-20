import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { User, UserDocument, UserSchema } from "src/schemas/user.schema";
import { JwtStrategy } from "../auth/jwt.strategy";
import { Model } from "mongoose"
import { InjectModel } from "@nestjs/mongoose";
import { InformationUserDto } from "src/dtos/user.dto";


@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

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
}
