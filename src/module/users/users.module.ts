
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import {User, UserSchema} from "./schemas/user.schema";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { UsersRepository } from "./users.reposotiry";

@Module ({
    imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
    controllers: [UsersController],
    providers: [UsersService, UsersRepository]
})

export class UsersModule {}