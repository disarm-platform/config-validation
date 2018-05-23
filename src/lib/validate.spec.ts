// tslint:disable:no-expression-statement
import { test } from 'ava';
import { TNumberConfig } from './Config';
import { ENodeStatus, TNodeResponse } from './NodeResponse';
import { validate_node } from './validate';

test('valid config number', t => {
  const node: TNumberConfig = { number: 1 };
  const response: TNodeResponse = validate_node(node);

  t.is(response.status, ENodeStatus.Blue);
  t.is(response.messages.length, 1);
});
