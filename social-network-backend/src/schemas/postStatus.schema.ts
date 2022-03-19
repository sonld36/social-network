import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { User } from "./user.schema";
import { statusOfPost } from "src/constants/constants";

export type PostDocument = PostStatus & Document;

@Schema()
export class PostStatus {
  @Prop({
    required: true
  })
  content: string;

  @Prop()
  images: Array<string>;


  @Prop({
    default: statusOfPost.PUBLIC
  })
  status: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId, ref: "User"
  })
  author: User;

  @Prop({
    type: Date,
    default: Date.now()
  })
  createdAt: Date;

  @Prop({
    type: Date,
    default: Date.now()
  })
  updatedAt: Date;

}

export const PostSchema = SchemaFactory.createForClass(PostStatus);
