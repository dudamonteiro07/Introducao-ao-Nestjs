import { ApiProperty } from "@nestjs/swagger"
import { PlaceType } from "@prisma/client"
import { IsEnum, IsNumber, IsString } from "class-validator"
import { Type } from "class-transformer"


export class CreatePlaceDto {

    @ApiProperty({example: 'Bom no prato'})
    name: string 

    @ApiProperty({example: 'RESTAURANTE'})
    @IsEnum(PlaceType)
    typePlace: PlaceType

    @ApiProperty({example: '(88) 98804-5421'})
    @IsString()
    phone: string

    @ApiProperty({example: -3.7327})
    @IsNumber()
    latitude: number

    @ApiProperty({example: -38.5267})
    @IsNumber()
    longitude: number;

}
