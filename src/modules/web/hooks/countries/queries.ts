import axios from "axios";
import { Country } from "./CountriesI";

type GetCountriesFn = {
    (): Promise<Country[]>;
};

export const getCounties: GetCountriesFn =  async () => {
    const response = await axios.get('https://restcountries.com/v2/all?fields=alpha2Code,name,capital,languages,region');

    return response.data;
};