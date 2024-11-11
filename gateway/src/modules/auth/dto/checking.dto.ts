import { ApiProperty } from "@nestjs/swagger"

export class Checking {
    @ApiProperty({example: 'token'})
    token: string;
}
