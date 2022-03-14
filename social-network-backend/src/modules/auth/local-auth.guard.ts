import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { LocalStrategy } from "./local.strategy";

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') implements CanActivate{
    constructor(private localStrategy: LocalStrategy){
        super();
    }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const {email, password} = request.body;
        return this.localStrategy.validate(email, password);
    }
}