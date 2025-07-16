import { Injectable, BadRequestException } from '@nestjs/common';
import { Place, PlaceType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { imageObject } from './types/image.object';
import { CloudinaryService } from './clodinary.place';


@Injectable()
export class PlaceService {
  constructor(
    private prisma: PrismaService,
    private cloudinaryService: CloudinaryService,
  ) { }

  async findAll() {
    return this.prisma.place.findMany();
  }

  async create(data: { name: string, typePlace: PlaceType, phone: string, latitude: number, longitude: number, images: imageObject[] }) {
    return this.prisma.place.create({ data });
  }

  async update(id: string, data: Partial<Place>, newImages?: Buffer[]): Promise<Place> {
    const place = await this.prisma.place.findUnique({ where: { id } });
    if (!place) throw new BadRequestException('Local não encontrado');

    let images = place.images as imageObject[];
    
    // Se forem enviadas novas imagens
    if (newImages && newImages.length > 0) {
      // Deletar imagens antigas
      await Promise.all(images.map(img => this.cloudinaryService.deleteImage(img.public_id)));
      // Upload das novas imagens
      images = await Promise.all(newImages.map(file => this.cloudinaryService.uploadImage(file)));
    }

    return this.prisma.place.update({
      where: { id },
      data: {
        ...data,
        ...(newImages ? { images: JSON.parse(JSON.stringify(images)) } : {}),
      },
    });
  }

  async delete(id: string): Promise<void> {
    const place = await this.prisma.place.findUnique({ where: { id } });
    if (!place) throw new BadRequestException('Local não encontrado');
    const images = place.images as imageObject[];
    await Promise.all(images.map(img => this.cloudinaryService.deleteImage(img.public_id)));
    await this.prisma.place.delete({ where: { id } });
  }

}