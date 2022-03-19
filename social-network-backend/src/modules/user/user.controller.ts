import { Controller, Body, Get, Post, Request, UseGuards, UseInterceptors, UploadedFile, Param } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { InformationUserDto } from "src/dtos/user.dto";
import { User } from "src/schemas/user.schema";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UserService } from "./user.service";
import { diskStorage } from "multer";
import { editFileName } from "src/constants/constantFunctions";


@UseGuards(JwtAuthGuard)
@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}


  @Get("/profile")
  getUserProfile(@Request() request): Promise<any> {
    return this.userService.findUserById(request.user.userId);
  }

  @Get("/profile/:id")
  getUserStatusByIdUser(@Param() param) {
    return this.userService.getUserStatusByUserId(param.id);
  }

  @Post("/update-info")
  updateInforUser(@Request() request, @Body() information: InformationUserDto): Promise<User> {
      // console.log(request.user.userId);
      return this.userService.updateInforDetail(request.user.userId, information);
  } 


  @Post("/upload-avatar")
  @UseInterceptors(FileInterceptor("avatar", 
    {
      storage: diskStorage({
        destination: `./upload/avatar`,
        filename: async (req, file, cb) => editFileName(req, file, cb),
      })
    })
  )
  uploadAvatar(@Request() request,@UploadedFile() file: Express.Multer.File): Promise<any> {
    return this.userService.uploadAvatar(request.user.userId, file.path);
  };
}

    