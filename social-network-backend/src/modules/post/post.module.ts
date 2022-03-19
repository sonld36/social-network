import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PostSchema, PostStatus } from "src/schemas/postStatus.schema";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: PostStatus.name, schema: PostSchema }])],
    controllers: [PostController],
    providers: [PostService],
    exports: [PostService]
})


export class PostModule {};