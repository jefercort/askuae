import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ServiceOfferingsService } from './service-offerings.service';
import { CreateServiceOfferingDto } from './dto/create-service-offering.dto';
import { UpdateServiceOfferingDto } from './dto/update-service-offering.dto';
import { CurrentUser } from '../firebase/current-user.decorator';
import type { DecodedIdToken } from 'firebase-admin/auth';
import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';

// aca asi este usando la misma ruta inicial de service-providers no es la misma ya que
// Nest elige la ruta comparando su forma completa (segmentos fijos y posiciones),
// por eso no choca con las rutas de ServiceProvidersController
@Controller('service-providers/:providerId/offerings')
export class ServiceOfferingsController {
  constructor(
    private readonly serviceOfferingsService: ServiceOfferingsService,
  ) {}

  // ':algo' es una variable dentro de la URL
  @UseGuards(FirebaseAuthGuard)
  @Post()
  create(
    @Param('providerId', ParseUUIDPipe) providerId: string,
    @Body() createServiceOfferingDto: CreateServiceOfferingDto,
    @CurrentUser() user: DecodedIdToken,
  ) {
    return this.serviceOfferingsService.createServiceOffering(
      createServiceOfferingDto,
      providerId,
      user.uid,
    );
  }

  @UseGuards(FirebaseAuthGuard)
  // Esto completo es un endpoint
  // service-providers/:providerId/offerings/:offeringId
  @Patch(':offeringId')
  update(
    // Utilizo ParseIntPipe para convertir el string que viene a numero
    @Param('offeringId', ParseIntPipe) offeringId: number,
    @Param('providerId', ParseUUIDPipe) providerId: string,
    @Body() updateServiceOfferingDto: UpdateServiceOfferingDto,
    @CurrentUser() user: DecodedIdToken,
  ) {
    return this.serviceOfferingsService.updateServiceOffered(
      offeringId,
      providerId,
      user.uid,
      updateServiceOfferingDto,
    );
  }

  @UseGuards(FirebaseAuthGuard)
  @Delete(':offeringId')
  remove(
    @Param('offeringId', ParseIntPipe) offeringId: number,
    @Param('providerId', ParseUUIDPipe) providerId: string,
    @CurrentUser() user: DecodedIdToken,
  ) {
    return this.serviceOfferingsService.removeServiceOffered(
      offeringId,
      providerId,
      user.uid,
    );
  }
}
