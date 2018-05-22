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