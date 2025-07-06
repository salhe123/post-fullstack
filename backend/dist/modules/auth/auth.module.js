"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const auth_controller_1 = require("./controllers/auth.controller");
const auth_service_1 = require("./auth.service");
const user_repository_1 = require("./repositories/user.repository");
const user_entity_1 = require("./entities/user.entity");
const jwt_config_1 = require("../../config/jwt.config");
const passport_1 = require("@nestjs/passport");
const jwt_strategy_1 = require("./jwt.strategy");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
            jwt_1.JwtModule.register(jwt_config_1.jwtConfig),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, user_repository_1.UserRepository, jwt_strategy_1.JwtStrategy],
        exports: [auth_service_1.AuthService, user_repository_1.UserRepository],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map