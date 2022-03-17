import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MulterModule } from "@nestjs/platform-express";
import { User, UserSchema } from "src/schemas/user.schema";
import { AuthenticateModule } from "../auth/authenticate.module";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { JwtStrategy } from "../auth/jwt.strategy";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { diskStorage } from "multer";

@Module({
    imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
            AuthenticateModule
            ],
    controllers: [UserController],
    providers: [UserService],
})

export class UserModule {};