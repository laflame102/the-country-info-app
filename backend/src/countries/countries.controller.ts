import { Controller, Get, Param } from '@nestjs/common';
import { CountriesService } from './countries.service';

@Controller('countries')
export class CountriesController {
  constructor(private countriesService: CountriesService) {}

  @Get('get-countries')
  async getAvailableCountries() {
    return await this.countriesService.getAvailableCountries();
  }

  @Get('get-country-info/:countryCode')
  async getCountryInfo(@Param('countryCode') countryCode: string) {
    return await this.countriesService.getCountryInfo(countryCode);
  }
}
