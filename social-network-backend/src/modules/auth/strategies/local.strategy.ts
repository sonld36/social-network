import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, Inject, UnauthorizedException } from "@nestjs/common";
import { AuthenticateService } from "../authenticate.service";
import { LoginDto } from "src/dtos/user.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthenticateService) {
        super();
    }

    async validate(email: string, password: string): Promise<any> {
        // console.log("ajijiji");
        const user = this.authService.validateUser(email, password);
        if(!user) {
            throw new UnauthorizedException();
        }
        
        return user;
    }

}
