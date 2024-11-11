import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends(CreateUserDto) {
    @ApiProperty({example: '998909116360'})
    phone: string;

    @ApiProperty({example: '1221'})
    password: string;
}
