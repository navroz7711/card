import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateForAllNotifyDto {
    @ApiProperty({example: `Xato yo'qoldi`})
    @IsString()
    @IsNotEmpty()
    message: string;
}
