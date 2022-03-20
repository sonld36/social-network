import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
<<<<<<< HEAD
import { MulterModule } from "@nestjs/platform-express";
=======
import { PostSchema, PostStatus } from "src/schemas/postStatus.schema";
>>>>>>> c05ab3386a46e214832b33eec12163638292a5f8
import { User, UserSchema } from "src/schemas/user.schema";
import { AuthenticateModule } from "../auth/authenticate.module";
import { PostModule } from "../post/post.module";
import { PostService } from "../post/post.service";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { diskStorage } from "multer";

@Module({
<<<<<<< HEAD
    imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
            AuthenticateModule
            ],
    controllers: [UserController],
    providers: [UserService],
=======
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema },
  { name: PostStatus.name, schema: PostSchema }]),
    AuthenticateModule,
    PostModule
  ],
  controllers: [UserController],
  providers: [UserService],
>>>>>>> c05ab3386a46e214832b33eec12163638292a5f8
})

export class UserModule { };