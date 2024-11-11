import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateForOneNotifyDto {
    @ApiProperty({example: `xatolar yo'qoldi`})
    @IsString()
    @IsNotEmpty()
    message: string;

    @ApiProperty({example: 'Uid'})
    @IsUUID()
    @IsNotEmpty()
    userId: string;
}
