export interface TAggregation {
  name: string;
  numerator_expr: string;
  denominator_field?: string;
  denominator_aggregation?: string;
}

export type TAggregations = TAggregation[];
