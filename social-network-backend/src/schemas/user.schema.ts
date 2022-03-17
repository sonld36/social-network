import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { type } from "os";

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
}

export const UserSchema = SchemaFactory.createForClass(User);