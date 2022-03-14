import { HttpException, HttpStatus } from "@nestjs/common";

export default class BaseService {
    constructor(){}
    response (data:any, code: number = 200, message: string = "success", error: boolean = false) {
        return {
            data,
            code,
            message,
            error,
        }
    }
}