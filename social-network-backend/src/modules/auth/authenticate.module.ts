import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { jwtConstants } from "src/constants/constants";
import { User, UserSchema } from "src/schemas/user.schema";
import { AuthenticateController } from "./authenticate.controller";
import { AuthenticateService } from "./authenticate.service";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { JwtStrategy } from "./jwt.strategy";
import { LocalStrategy } from "./local.strategy";

@Module({
  imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: {expiresIn: '600s'},
    })],
  providers: [AuthenticateService, LocalStrategy, JwtStrategy],
  controllers: [AuthenticateController],
  exports: [AuthenticateService]
})

export class AuthenticateModule {}