export interface TConfig {
  number_config?: TNumberConfig;
  string_config?: TStringConfig;
}

export interface TNumberConfig {
  number: number;
  array_of_numbers: number[];
}

export interface TStringConfig {
  strings: string[];
  optional_string?: string;
}

export interface TInstanceConfig {
  slug: string;
}
