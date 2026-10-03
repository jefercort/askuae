import { Injectable } from '@nestjs/common';
import { CreateNegocioDto } from './dto/create-negocio.dto';
import { UpdateNegocioDto } from './dto/update-negocio.dto';

@Injectable()
export class NegociosService {
  create(createNegocioDto: CreateNegocioDto) {
    return {
      mensaje: 'El chef recibio la orden y la cocinó correctamente',
      datosRecibidos: createNegocioDto,
    };
  }

  findAll() {
    return `This action returns all negocios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} negocio`;
  }

  update(id: number, updateNegocioDto: UpdateNegocioDto) {
    return `This action updates a #${id} negocio`;
  }

  remove(id: number) {
    return `This action removes a #${id} negocio`;
  }
}
