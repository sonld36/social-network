import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/schemas/user.schema";
import { AuthenticateModule } from "../auth/authenticate.module";
import { FriendModule } from "../friend/friend.module";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";


@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    AuthenticateModule,
    FriendModule
  ],
  controllers: [UserController],
  providers: [UserService],
})

export class UserModule { };