import { appConfig } from "@config";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

type JwtPAyload = {
    sub: string,
    phone: string
}

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt'){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: appConfig.atSecret,
        });
    }

    validate(payload: JwtPAyload){
        return payload; 
    }
}