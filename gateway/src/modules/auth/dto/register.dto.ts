import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsPhoneNumber, IsString } from "class-validator"

export class signupAuthDto {
    @ApiProperty({example: '+9989909116360'})
    @IsString()
    @IsPhoneNumber('UZ')
    @IsNotEmpty()
    phone: string;

    @ApiProperty({example: 'navroz1'})
    @IsNotEmpty()
    @IsString()
    password: string;
}
