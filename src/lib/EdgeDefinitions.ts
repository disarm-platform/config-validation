// tslint:disable:object-literal-sort-keys

export interface EdgeDefition {
  name: string;
  from: string;
  to: string;
}


export const EdgeDefitions : EdgeDefition[] = [
  {
    // do we need the function here as well? Seems nicer to have the actual function referenced, instead of doing it using strings
    name: 'irs_monitor_aggregations',
    from: 'irs_monitor',
    to: 'aggregations',
  }
]