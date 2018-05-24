export enum ENodeStatus {
  Red = 'Red - fails internal validation',
  Green = 'Green - passed internal validation',
  Blue = 'Blue - node not required' // TODO: Is logically possible to not require a node you are testing?
}
