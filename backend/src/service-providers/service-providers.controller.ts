import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
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
    return this.serviceProvidersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceProvidersService.findOne(+id);
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
