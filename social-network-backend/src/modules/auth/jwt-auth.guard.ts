import { HttpException, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { TokenExpiredError } from "jsonwebtoken"
import { HttpStatus } from "@nestjs/common";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
    handleRequest(err: any, user: any, info: any, context: any, status?: any) {
        if(info instanceof TokenExpiredError || !user) {
            throw new HttpException('error.authentication.token_expired', HttpStatus.UNAUTHORIZED);
        }

        return user;
    }
}