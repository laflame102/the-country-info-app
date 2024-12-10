import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CountriesService {
  async getAvailableCountries() {
    try {
      const { data } = await axios.get(
        `${process.env.DATE_NAGER_API}/AvailableCountries`,
      );

      if (data.length === 0) {
        throw new NotFoundException('No countries found');
      }

      return data;
    } catch (error) {
      console.log(error);
      throw new HttpException('Server error occurred', HttpStatus.BAD_GATEWAY);
    }
  }

  async getCountryInfo(countryCode: string) {
    try {
      const [bordersData, populationData, flagData] = await Promise.allSettled([
        this.getBorderCountries(countryCode),
        this.getPopulationData(countryCode),
        this.getFlag(countryCode),
      ]);

      return { bordersData, populationData, flagData };
    } catch (error) {
      console.log(error);
      throw new HttpException('Server error occurred', HttpStatus.BAD_GATEWAY);
    }
  }

  private async getBorderCountries(countryCode: string) {
    try {
      const { data } = await axios.get(
        `${process.env.DATE_NAGER_API}/CountryInfo/${countryCode}`,
      );

      if (!data.borders || data.borders.length === 0) {
        throw new NotFoundException('No border countries found');
      }
      return { commonName: data.commonName, borders: data.borders };
      //   return data.borders;
    } catch (error) {
      console.log(error);
      throw new HttpException('Server error occurred', HttpStatus.BAD_GATEWAY);
    }
  }

  private async getPopulationData(countryCode: string) {
    try {
      const countryName = await this.getCountryNameByCode(countryCode);

      const { data } = await axios.post(
        `${process.env.COUNTRIES_NOW_API}/countries/population`,
        {
          country: countryName,
        },
      );

      const population = data.data.populationCounts;

      if (population.length === 0) {
        throw new NotFoundException('No population data found');
      }

      return population;
    } catch (error) {
      console.log(error);
      throw new HttpException('Server error occurred', HttpStatus.BAD_GATEWAY);
    }
  }

  async getFlag(countryCode: string) {
    try {
      const countryIso = await this.getCountryIsoByCode(countryCode);

      const { data } = await axios.post(
        `${process.env.COUNTRIES_NOW_API}/countries/flag/images`,
        {
          iso2: countryIso,
        },
      );

      const flag = data.data?.flag;

      if (!flag) {
        throw new NotFoundException('Flag not found');
      }

      return flag;
    } catch (error) {
      console.log(error);
      throw new HttpException('Server error occurred', HttpStatus.BAD_GATEWAY);
    }
  }

  private async getCountryNameByCode(countryCode: string) {
    try {
      const { data } = await axios.get(
        `${process.env.DATE_NAGER_API}/CountryInfo/${countryCode}`,
      );

      if (!data.commonName) {
        throw new NotFoundException(
          'Country name not found for the given code',
        );
      }

      return data.commonName;
    } catch (error) {
      console.error(error);
      throw new HttpException('Server error occurred', HttpStatus.BAD_GATEWAY);
    }
  }

  private async getCountryIsoByCode(countryCode: string) {
    try {
      const countryName = await this.getCountryNameByCode(countryCode);

      const { data } = await axios.post(
        `${process.env.COUNTRIES_NOW_API}/countries/iso`,
        { country: countryName },
      );

      const iso2 = data.data?.Iso2;

      if (!iso2) {
        throw new NotFoundException(
          'Country name not found for the given code',
        );
      }

      return iso2;
    } catch (error) {
      console.error(error);
      throw new HttpException('Server error occurred', HttpStatus.BAD_GATEWAY);
    }
  }
}
