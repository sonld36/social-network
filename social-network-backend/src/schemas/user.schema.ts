import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Document } from "mongoose";
import { type } from "os";
import { Role } from "src/modules/auth/enums/role.enum";
import { Friends } from "./friends.schema";

export type UserDocument = User & Document;

@Schema()
export class User {

    @Prop()
    firstname: string;

    @Prop()
    lastname: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop({type: Object})
    inforDetail: {
        province: string,
        school: string,
        phoneNumber: string,
    };

    @Prop()
    avatar: string;

    @Prop()
    roles: Role[];

    @Prop({
        type: mongoose.Schema.Types.Array,
        ref: Friends.name,
    })
    friends: Friends;

}

export const UserSchema = SchemaFactory.createForClass(User);