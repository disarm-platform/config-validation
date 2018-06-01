import { TApplet } from "./TApplet";

// tslint:disable:no-mixed-interface

export interface PropertyLayer {
  property: string;
  label: string;
}

export interface ChartMultiSeries {
  aggregation_name: string;
  colour?: string;
}

export interface ChartSingleSeries {
  aggregation_name: string;
};

export type HeightConstraint = 'none' | 'full'

export type WidthConstraint = 'half' | 'full'

export interface ChartStyle {
  // need to check if full or something else
  height_constraint: HeightConstraint;
  width_constraint: WidthConstraint;
}

export interface ChartOptionsLayoutAxis {
  title: string;
};

export type BarMode = 'stack'

export interface ChartOptionsLayout {
  showlegend?: boolean;
  title: string;
  yaxis?: ChartOptionsLayoutAxis;
  xaxis?: ChartOptionsLayoutAxis;
  barmode?: BarMode;
}

export type ChartType = 'bar' | 'text' | 'line' | 'pie'

export interface ChartOptions {
  chart_type: ChartType;
  title?: string;
  text?: string;
  layout?: ChartOptionsLayout;
  cumulative?: boolean;
  time_series?: boolean;
  bin_by?: string;
  geographic_level_refactor_this_key_name?: string;
  multi_series?: ChartMultiSeries[];
  single_series?: ChartSingleSeries;
  generate_series_from?: string;
}

export type TextChart = 'text'

export interface ChartConfig {
  // id is required for all
  id: string;
  style: ChartStyle;
  options: ChartOptions;
  chart_type: TextChart;
}

export type Map = 'map'

export interface ChartMap {
  chart_type: Map;
  bin_by: string;
  aggregation_names: string[];
  response_point_fields: string[];
  property_layers: PropertyLayer[];
}

export type Table = 'table'


export interface ChartTable {
  chart_type: Table;
  bin_by: string;
  aggregation_names: string[];
  property_layers: PropertyLayer[];
}

/**
 * The configuration for the IRS Monitor applet for douma
 */
export interface IrsMonitor extends TApplet {
  /**
   * The start of the current season
   */
  season_start_dates: string[];
  /**
   * Map configuration
   */
  map: ChartMap;
  /**
   * Table configuration
   */
  table: ChartTable;
  charts: ChartConfig[];
}
