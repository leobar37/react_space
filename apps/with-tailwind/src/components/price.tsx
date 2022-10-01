import * as React from "react";
type PriceProps = {};
export const Price: React.FunctionComponent<PriceProps> = ({ children }) => {
  return <>{children + " s/."}</>;
};
