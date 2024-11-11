import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export const GetCurrentUserId = createParamDecorator(
  async (data: undefined, context: ExecutionContext): Promise<string> => {
    const rpcData = context.switchToRpc().getData();

    const token = rpcData?.token || rpcData?.refresh_token;

    if (!token) {
      throw new ForbiddenException('Token not found');
    }

    const jwtService = new JwtService();
    try {
      const decoded = jwtService.decode(token) as any;
      return decoded?.sub;
    } catch (error) {
      throw new ForbiddenException('Invalid token');
    }
  },
);
