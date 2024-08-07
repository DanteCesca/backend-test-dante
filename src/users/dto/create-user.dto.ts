import { IsNotEmpty, IsString, MinLength, MaxLength, IsEmail } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(21)
    name: string;

    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(14)
    password: string;
}
