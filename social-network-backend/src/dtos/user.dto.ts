import { IsEmail, 
        IsNotEmpty,
        IsString,
        MinLength,
        Matches,
        MaxLength,
     } from "class-validator";



export class RegisterDto {

    @IsString()
    @IsNotEmpty()
    firstname: string;

    @IsString()
    @IsNotEmpty()
    lastname: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(8)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%&?~]{8,}$/,{
        message: "Password is invalid",
    })
    password: string;
}

export class InformationUserDto {
    province: string;
    school: string;
    phoneNumber: string;
    avatar: string;
}

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsString()
    @MinLength(8)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%&?~]{8,}$/,{
        message: "Password is invalid",
    })
    password: string;

}