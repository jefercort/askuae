import { Test, TestingModule } from '@nestjs/testing';
import { ServiceOfferingsController } from './service-offerings.controller';
import { ServiceOfferingsService } from './service-offerings.service';

describe('ServiceOfferingsController', () => {
  let controller: ServiceOfferingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceOfferingsController],
      providers: [ServiceOfferingsService],
    }).compile();

    controller = module.get<ServiceOfferingsController>(
      ServiceOfferingsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
