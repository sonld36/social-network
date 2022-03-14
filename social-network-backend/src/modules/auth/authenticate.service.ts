import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "src/schemas/user.schema";
import { Model } from "mongoose";
import { LoginDto, RegisterDto } from "src/dtos/user.dto";
import { use } from "passport";
import { JwtService } from "@nestjs/jwt";


const bcrypt = require("bcrypt");

@Injectable()

export class AuthenticateService {
    constructor(@InjectModel(User.name) private user: Model<UserDocument>,
                private jwtService: JwtService) {}

    async create(aUser: RegisterDto): Promise<any> {
        var { password } = aUser;

        const salt = await bcrypt.genSalt(10);

        password = await bcrypt.hash(password, salt);

        const newUser = {
            ...aUser,
            password
        };

        return this.user.create(newUser);

    }

    async findOne(email: string): Promise<any> {
        return this.user.findOne({email: email});
    }

    async validateUser(email: string, confirmpassword: string): Promise<any> {
        
        const user = await this.findOne(email);
        if(user && await bcrypt.compare(confirmpassword, user.password)) {
            const resp = {
                "userId": user._id,
                "firstname": user.firstname,
                "lastname": user.lastname,
                "email": user.email,
            }
            return resp;
        }

        return null;
    }

    async login(aUser: LoginDto) {
        const user = await this.findOne(aUser.email);
        const { email, _id } = user;
        const payload = {username: email, sub: _id};
        return {
            token: this.jwtService.sign(payload)
        };
    }
}