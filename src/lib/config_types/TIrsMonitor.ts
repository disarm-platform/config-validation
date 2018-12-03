import { TApplet } from './TApplet';

// tslint:disable:no-mixed-interface

export interface TPropertyLayer {
  property: string;
  label: string;
}

export interface TChartMultiSeries {
  aggregation_name: string;
  colour?: string;
}

export interface TChartSingleSeries {
  aggregation_name: string;
}

export type THeightConstraint = 'none' | 'full';

export type TWidthConstraint = 'half' | 'full';

export interface TChartStyle {
  // need to check if full or something else
  height_constraint: THeightConstraint;
  width_constraint: TWidthConstraint;
}

export interface TChartOptionsLayoutAxis {
  title: string;
}

export type TBarMode = 'stack';

export interface TChartOptionsLayout {
  showlegend?: boolean;
  title: string;
  yaxis?: TChartOptionsLayoutAxis;
  xaxis?: TChartOptionsLayoutAxis;
  barmode?: TBarMode;
}

export type TChartType = 'bar' | 'text' | 'line' | 'pie';

export interface TChartOptions {
  chart_type?: TChartType;
  title?: string;
  text?: string;
  layout?: TChartOptionsLayout;
  cumulative?: boolean;
  time_series?: boolean;
  bin_by?: string;
  geographic_level_refactor_this_key_name?: string;
  multi_series?: TChartMultiSeries[];
  single_series?: TChartSingleSeries;
  generate_series_from?: string;
}

export type TTextChart = 'text';

export interface TChartConfig {
  // id is required for all
  id: string;
  style: TChartStyle;
  options: TChartOptions;
  chart_type?: TTextChart;
}

export type TMap = 'map';

export interface TChartMap {
  chart_type?: TMap;
  bin_by: string;
  aggregation_names: string[];
  response_point_fields: string[];
  property_layers: TPropertyLayer[];
}

export type TTable = 'table';

export interface TChartTable {
  chart_type?: TTable;
  bin_by: string;
  aggregation_names: string[];
  property_layers: TPropertyLayer[];
}

/**
 * The configuration for the IRS Monitor applet for douma
 */
export interface TIrsMonitor extends TApplet {
  /**
   * The start of the current season
   */
  season_start_dates: string[];
  /**
   * Map configuration
   */
  map: TChartMap;
  /**
   * Table configuration
   */
  table: TChartTable;
  charts: TChartConfig[];
}
