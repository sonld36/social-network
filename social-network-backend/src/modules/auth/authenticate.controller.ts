import { Controller, Body, Get, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { LoginDto, RegisterDto } from "src/dtos/user.dto";
import { User } from "src/schemas/user.schema";
import { AuthenticateService } from "./authenticate.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";


@Controller("auth")

export class AuthenticateController{
    constructor(private authService: AuthenticateService) {
    }

    @Post("register")
    regisUser(@Body() aUser: RegisterDto): Promise<any> {
        return this.authService.create(aUser);   
    }

    @UseGuards(LocalAuthGuard)
    @Post("login")
    userLogin(@Body() aUser: LoginDto): Promise<any> {
        return this.authService.login(aUser);
    }

}