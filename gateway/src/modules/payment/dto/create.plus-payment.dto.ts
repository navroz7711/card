import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePlusPaymentDto {
    @ApiProperty({example: 10})
    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @ApiProperty({example: 'UZS'})
    @IsString()
    @IsNotEmpty()
    currency: string;

    @ApiProperty({example: 'humo_card'})
    @IsString()
    @IsNotEmpty()
    paymentMethod: string;
}
