import { Controller, Body, Get, Post, Request, UseGuards, UseInterceptors, UploadedFile, Delete, Param } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { InformationUserDto } from "src/dtos/user.dto";
import { User } from "src/schemas/user.schema";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { UserService } from "./user.service";
import { diskStorage } from "multer";
import { editFileName } from "src/constants/constantFunctions";
import { RoleGuard } from "../auth/guards/role.guard";
import { Roles } from "../auth/decorators/role.decorator";
import { Role } from "../auth/enums/role.enum";


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
        filename: async (req, file, cb) => editFileName(req, file, cb)
      })
    }))
  uploadAvatar(@Request() request,@UploadedFile() file: Express.Multer.File): Promise<any> {
    return this.userService.uploadAvatar(request.user.userId, file.path);
  };

  @Roles(Role.Admin)
  @UseGuards(RoleGuard)
  @Delete("/user/:id")
  deleteUser(@Param() param) {
    return this.userService.deleteUser(param.id);
  }

  @Post("/send-friend-invite/:idRec")
  async sendFriendInvitaion(@Param() param, @Request() req) {
    return await this.userService.sendFriendInvitation(req.user.userId, param.idRec);
  }

  @Post("/accept-friend-invite/:idReq")
  async acceptFriendInvitation(@Param() param, @Request() req) {
    return await this.userService.acceptRequestFriend(req.user.userId, param.idReq);
  }
}
