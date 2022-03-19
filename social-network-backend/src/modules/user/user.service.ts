import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { User, UserDocument, UserSchema } from "src/schemas/user.schema";
import { JwtStrategy } from "../auth/jwt.strategy";
import { Model } from "mongoose"
import { InjectModel } from "@nestjs/mongoose";
import { InformationUserDto } from "src/dtos/user.dto";
import { PostService } from "../post/post.service";
import { getJsonRes, sanitizeUser } from "src/constants/constantFunctions";
import { PostStatus } from "src/schemas/postStatus.schema";


@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
      private postService: PostService) {}


  async findUserById(idUser: string): Promise<any> {
    return await this.userModel.findById(idUser)
      .then(user => sanitizeUser(getJsonRes(user)))
      .catch(err => {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      });
  }


  async updateUserById(idUser: string, user: User): Promise<User> {
    return getJsonRes(await this.userModel.findByIdAndUpdate({ _id: idUser }, user, { new: true }).exec());   
  }

  async updateInforDetail(idUser: string, inforDetail: InformationUserDto): Promise<User> {
    return this.findUserById(idUser).then(async user => {
      user = {
        ...user,
        inforDetail: inforDetail
      };
      return sanitizeUser(await this.updateUserById(idUser, user));  
    });   
  }

  async uploadAvatar(idUser: string, path: string): Promise<any> {
    return this.findUserById(idUser).then(async user => {
      user = {
        ...user,
        avatar: path
      };
      return sanitizeUser(await this.updateUserById(idUser, user));
    }).catch(err => {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    })
  }

  async getUserStatusByUserId(idUser: string): Promise<PostStatus[]> {
    return this.postService.getPostsByUserId(idUser);
  }

}
