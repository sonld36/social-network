import { Controller, Body, Get, Post, Request, UseGuards, UseInterceptors, UploadedFile } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { request } from "http";
import { Observable, of } from "rxjs";
import { InformationUserDto } from "src/dtos/user.dto";
import { User } from "src/schemas/user.schema";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UserService } from "./user.service";
import { diskStorage } from "multer";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { uuid } from "uuidv4";

import path = require("path");


@UseGuards(JwtAuthGuard)
@Controller("")
export class UserController {
  constructor(private userService: UserService) {}


  @Get("/user/profile")
  getUserProfile(@Request() request): Promise<any> {
    return this.userService.findUserById(request.user.userId);
  }

  @Post("/user/update-info")
  updateInforUser(@Request() request,@Body() information: InformationUserDto): Promise<User> {
      // console.log(request.user.userId);
      return this.userService.updateInforDetail(request.user.userId, information);
  } 


  @Post("/user/upload-avatar")
  @UseInterceptors(FileInterceptor("avatar", 
    {
      storage: diskStorage({
        destination: `./upload/avatar`,
        filename: async (req, file, cb) => {
          const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuid();
          const extension: string = path.parse(file.originalname).ext;

          cb(null, `${filename}${extension}`);
        }
      })
    }))
  uploadAvatar(@Request() request,@UploadedFile() file: Express.Multer.File): Promise<any> {
    return this.userService.uploadAvatar(request.user.userId, file.path);
  };
}

    