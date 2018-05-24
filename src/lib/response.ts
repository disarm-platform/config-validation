export enum Status {
  Green,
  Yellow,
  Red,
  Blue
}

export type Message = string;

export interface Response {
  status: Status;
  messages: Message[];
}

export interface NumberConfig {
  number: number;
  array_of_numbers: number[];
}

export interface StringConfig {
  strings: string[],
  optional_string?: string
}

export interface Config {
  number_config?: NumberConfig,
  string_config?: StringConfig
}