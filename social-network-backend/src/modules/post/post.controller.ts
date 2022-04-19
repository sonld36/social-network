import { Controller, Get, Param, Post, Request, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { editFileName } from "src/constants/constantFunctions";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RoleGuard } from "../auth/guards/role.guard";
import { PostService } from "./post.service";

@Controller("post")

export class PostController {
  constructor(private postService: PostService) { };

  // @UseGuards(JwtAuthGuard, RoleGuard)
  // @Roles(Role.Admin)
  @Get("")
  async getPost() {
    return this.postService.getPost();
  }

  @Get(":userId/:postId")
  async getPostById(@Param() param) {
    return this.postService.getPostById(param.userId, param.postId);
  }

  @Post("/create")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor("image", 3, {
    storage: diskStorage({
      destination: `./upload/postFile`,
      filename: async (req, file, cb) => editFileName(req, file, cb),
    })
  }))
  async createPost(@UploadedFiles() files: Array<Express.Multer.File>, @Request() req) {
    return this.postService.createPost(files, req.body.content, req.user.userId);
  }


}