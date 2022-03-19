import { HttpCode, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose"
import { join } from "path";
import { getJsonRes, getPathFile } from "src/constants/constantFunctions";
import { PostStatus, PostDocument } from "src/schemas/postStatus.schema";

@Injectable()
export class PostService {
  constructor(@InjectModel(PostStatus.name) private postModel: Model<PostDocument>) {};

  async getPost(): Promise<PostStatus[]> {
    return this.postModel.find({})
      .populate({path: "author", select: ["_id", "firstname", "lastname"]})
      .exec();
  }

  async getPostById(userId: string, postId: string): Promise<any> {
    const postStatus = await this.postModel.findOne({author: userId, _id: postId}).exec();
    const files = getPathFile(postStatus);

    return {
      ...getJsonRes(postStatus),
      images: files
    }
  }


  async getPostsByUserId(userId: string): Promise<any | undefined> {
    return await this.postModel.find({author: userId}).exec()
      .then(posts => {
        if(posts) {
          const res = posts.map(post => {
            post = getJsonRes(post);
            return {
              ...post,
              images: getPathFile(post),
            }
          });
          return res;
        }
        return [];
    })
    .catch(err => {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    });
    // return [];
  }

  async createPost(files: Array<Object>, content: string, author: string): Promise<any> {

    const filePath = files.map(file => file['path']);
    
    const posted = new this.postModel({
      author,
      images: filePath,
      content
    })
    return posted.save();
  }
}