import { ReactNode } from "react";
import { To } from "react-router-dom";

export type CrumbData = {
  to?: To;
  label?: string;
  icon?: ReactNode;
};

export type RouteHandleObject = {
  crumb?: (data: any) => CrumbData;
  hideBreadcrumbs?: boolean;
};
