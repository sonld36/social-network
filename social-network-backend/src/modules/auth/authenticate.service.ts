import { HttpCode, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "src/schemas/user.schema";
import { Model } from "mongoose";
import { LoginDto, RegisterDto } from "src/dtos/user.dto";
import { use } from "passport";
import { JwtService } from "@nestjs/jwt";
import BaseController from "src/commons/baseService.service";
import BaseService from "src/commons/baseService.service";


const bcrypt = require("bcrypt");

@Injectable()

export class AuthenticateService extends BaseService{
    constructor(@InjectModel(User.name) private user: Model<UserDocument>,
                private jwtService: JwtService) {
                    super();
                }

    async findOneByEmail(email: string): Promise<any>{
        return this.user.findOne({email: email});
    }
            

    async create(aUser: RegisterDto): Promise<any> {
        var { email, password } = aUser;
        
        return this.findOneByEmail(email).then(async data => {
            if(data) {
                return this.response(
                    {},
                    409,
                    "Email have existed",
                    true
                )
            }

            const salt = await bcrypt.genSalt(10);

            password = await bcrypt.hash(password, salt);

            const newUser = {
                ...aUser,
                password
            };
            await this.user.create(newUser);
            return this.response(newUser);
        })
        .catch(err => this.response(err, 401, "Something was wrong", true));
 
        // return;

    }

    async validateUser(email: string, confirmpassword: string): Promise<any> {
        
        const user = await this.findOneByEmail(email);
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
        const user = await this.findOneByEmail(aUser.email);
        const { email, _id } = user;
        const payload = {username: email, sub: _id};
        return {
            token: this.jwtService.sign(payload)
        };
    }
}