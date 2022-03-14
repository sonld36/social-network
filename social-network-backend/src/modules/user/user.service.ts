import { Inject, Injectable } from "@nestjs/common";
import { User, UserDocument, UserSchema } from "src/schemas/user.schema";
import { JwtStrategy } from "../auth/jwt.strategy";
import { Model } from "mongoose"
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
                private jwtStrategy: JwtStrategy) {}

    async findUserById(idUser: string): Promise<User> {
        return await this.userModel.findById(idUser);
    }

}