import { URL_PARAMS_ACTIONS } from "../constants/custom-url-params.constants";

export type TUrlParamsForUpdateHook = {
  name: string;
  value: string | string[];
};

export type TUrlParamWithActionForUpdateHook = TUrlParamsForUpdateHook & {
  type: URL_PARAMS_ACTIONS;
};

export type QueryParams = {
  [key: string]: string | string[] | null;
};