import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

enum Action{
    plus = 'plus',
    minus = 'minus',
}

export class CreateMinusPaymentDto{
    @ApiProperty({example: 20})
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
