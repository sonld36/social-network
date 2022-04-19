import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { FriendStatus } from "src/commons/friendStatus.enum";
import { User } from "./user.schema";

export type FriendsDocument = Friends & Document;

@Schema()
export class Friends {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  })
  requester: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  })
  receivers: User;

  @Prop({
    type: String,
    enum: FriendStatus
  })
  status;
}

export const FriendsSchema = SchemaFactory.createForClass(Friends);
