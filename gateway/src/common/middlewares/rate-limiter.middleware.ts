// import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
// import { RateLimiterMemory } from 'rate-limiter-flexible';

// @Injectable()
// export class RateLimiterMiddleware implements NestMiddleware {
//   private readonly logger = new Logger(RateLimiterMiddleware.name); // Initialize logger

//   private rateLimiter = new RateLimiterMemory({
//     points: Number(process.env.RATE_LIMIT_POINTS) || 100, 
//     duration: Number(process.env.RATE_LIMIT_DURATION) || 60 * 60, 
//     blockDuration: Number(process.env.RATE_LIMIT_BLOCK_DURATION) || 60 * 15, 
//   });

//   constructor() {
//     this.use = this.use.bind(this);
//   }

//   async use(req: any, res: any, next: () => void) {
//     try {
//       await this.rateLimiter.consume(req.ip);
//       next(); 
//     } catch (rateLimiterRes) {
//       this.logger.warn(`Too many requests from IP: ${req.ip}`);

//       res.set('Retry-After', String(Math.ceil(rateLimiterRes.msBeforeNext / 1000)));
//       res.status(429).json({
//         statusCode: 429,
//         message: 'Too Many Requests - please try again later',
//         retryAfter: Math.ceil(rateLimiterRes.msBeforeNext / 1000), 
//       });
//     }
//   }
// }


