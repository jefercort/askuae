import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ServiceProvidersService } from './service-providers.service';
import { CreateServiceProviderDto } from './dto/create-service-provider.dto';
import { UpdateServiceProviderDto } from './dto/update-service-provider.dto';
import { CurrentUser } from '../firebase/current-user.decorator';
import type { DecodedIdToken } from 'firebase-admin/auth';
import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';

@Controller('service-providers')
export class ServiceProvidersController {
  constructor(
    private readonly serviceProvidersService: ServiceProvidersService,
  ) {}
  @UseGuards(FirebaseAuthGuard)
  @Post()
  create(
    @Body() createServiceProviderDto: CreateServiceProviderDto,
    @CurrentUser() user: DecodedIdToken,
  ) {
    return this.serviceProvidersService.createServiceProvider(
      createServiceProviderDto,
      user.uid,
    );
  }

  @Get()
  findAll() {
    return this.serviceProvidersService.findAllServiceProviders();
  }

  @Get(':id')
  // aca uso ParseUUIDPipe porque si envian algo como  /service-providers/hola va detectarlo como si fuera un error de tipo que daria 500, pero parseandolo se descarta que sea un error del Backend donde es un error del cliente 400
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.serviceProvidersService.findServiceProviderById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateServiceProviderDto: UpdateServiceProviderDto,
  ) {
    return this.serviceProvidersService.update(+id, updateServiceProviderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceProvidersService.remove(+id);
  }
}
