import { Test, TestingModule } from '@nestjs/testing';
import { ServiceOfferingsService } from './service-offerings.service';

describe('ServiceOfferingsService', () => {
  let service: ServiceOfferingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceOfferingsService],
    }).compile();

    service = module.get<ServiceOfferingsService>(ServiceOfferingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
