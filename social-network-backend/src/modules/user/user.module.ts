import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PostSchema, PostStatus } from "src/schemas/postStatus.schema";
import { User, UserSchema } from "src/schemas/user.schema";
import { AuthenticateModule } from "../auth/authenticate.module";
import { PostModule } from "../post/post.module";
import { PostService } from "../post/post.service";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema },
  { name: PostStatus.name, schema: PostSchema }]),
    AuthenticateModule,
    PostModule
  ],
  controllers: [UserController],
  providers: [UserService],
})

export class UserModule { };