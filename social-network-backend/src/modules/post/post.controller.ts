import { Body, Controller, Get, Param, Post, Request, Res, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { AnyFilesInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import path from "path";
import { editFileName } from "src/constants/constantFunctions";
import { uuid } from "uuidv4";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { PostService } from "./post.service";

@Controller("post")

export class PostController {
  constructor(private postService: PostService) {};

  @Get("")
  async getPost() {
    return this.postService.getPost();
  }

  @Get(":userId/:postId")
  async getPostById(@Param() param) {
    return this.postService.getPostById(param.userId, param.postId);
  } 

  // @Get("")

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