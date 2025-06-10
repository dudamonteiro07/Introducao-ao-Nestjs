import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { UserService } from './users.services'
@Controller('/User')
export class UsersController {


    private UserService: UserService


    constructor(UserService: UserService) {
        this.UserService = UserService

    }

    @Get()
    findAllUsers() {
        return this.UserService.findAll()
    }

    @Get(':id')
    findUser(@Param ('id') id:string){
        return this.UserService.findOne(parseInt(id))
    }

    @Post()
    createUser(@Body() user: {name:string, email:string}){
        return this.UserService.create(user)


    }



}