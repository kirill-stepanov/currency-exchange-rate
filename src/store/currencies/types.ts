export interface CurrenciesState {
  loading: boolean;
  base: string;
  currencies: CurrencyDataState[];
  favorites: string[];
}

export interface CurrencyDataState {
  code: string;
  rate: number;
}
