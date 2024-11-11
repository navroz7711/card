import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateLikeNotifyDto {
    @ApiProperty({example: 'Uid'})
    @IsNotEmpty()
    @IsUUID()
    id: string;
}