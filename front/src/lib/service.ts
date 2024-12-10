import { Country, CountryData } from "../types";

export const API_URL = import.meta.env.VITE_APP_KEY;

export class Service {
  static async getCountries(): Promise<Country[]> {
    const response = await fetch(`${API_URL}/countries/get-countries`);
    const data = await response.json();
    return data;
  }

  static async getCountryInfo(countryCode: string): Promise<CountryData> {
    const response = await fetch(
      `${API_URL}/countries/get-country-info/${countryCode}`,
    );
    const data = await response.json();
    return data;
  }
}
