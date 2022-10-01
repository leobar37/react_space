import * as React from "react";
import { NavBar } from "@app/components";
type LayoutProps = {};

export const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <React.Fragment>
      <NavBar />
      {children}
    </React.Fragment>
  );
};
