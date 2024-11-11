import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsPhoneNumber, IsString, IsUUID } from "class-validator"

export class updateAuthDto {
    @ApiProperty({example: 'Uid'})
    userId: string
    
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