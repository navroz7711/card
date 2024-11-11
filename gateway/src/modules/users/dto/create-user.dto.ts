import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty({example: 'Ali Valiyev'})
    @IsNotEmpty()
    @IsString()
    fullname: string;

    @ApiProperty({example: '2024-10-09T10:46:04Z'})
    @IsNotEmpty()
    @IsDateString()
    dateOfBirth: Date;
}
