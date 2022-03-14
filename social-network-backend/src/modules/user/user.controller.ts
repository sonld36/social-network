import { Controller, Body, Get, Post, Request, UseGuards } from "@nestjs/common";
import { User } from "src/schemas/user.schema";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { JwtStrategy } from "../auth/jwt.strategy";
import { UserService } from "./user.service";

@Controller("")

export class UserController {
    constructor(private userService: UserService) {}

    @UseGuards(JwtAuthGuard)
    @Get("/user/profile")
    getUserProfile(@Request() request): Promise<any> {
        return this.userService.findUserById(request.user.userId);
    }
}