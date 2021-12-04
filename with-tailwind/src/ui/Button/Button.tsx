import { bdMatchProp } from "@app/utils";
import cs from "classnames";
import React from "react";
import { ELements } from "@app/common";
type SizeVariants = "small" | "medium" | "large";
type ButtonProps = {
  size?: SizeVariants;
  variant?: "primary" | "secondary";
  rounded?: boolean;
} & ELements["button"];

export const Button: React.FunctionComponent<ButtonProps> = ({
  children,
  size,
  variant,
  rounded,
  className,
  ...props
}) => {
  const sizeStyles = bdMatchProp<string, ButtonProps["size"]>(size)({
    large: "py-2 px-[58px] text-xl",
    medium: "py-1 px-4 text-lg",
    small: "py-1 px-3 text-sm",
  });

  const caVariant = bdMatchProp<string, ButtonProps["variant"]>(variant)({
    primary: "bg-white",
    secondary: "bg-yellow-300",
  });

  const roundedStyles = bdMatchProp<string, ButtonProps["rounded"]>(rounded)({
    False: "",
    True: "rounded-md",
  });

  const classes = cs(
    "cursor-pointer font-bold transition",
    "hover:scale-[1.06]",
    caVariant,
    sizeStyles,
    roundedStyles,
    className
  );

  return (
    <button className={`${classes}`} {...props}>
      {children}
    </button>
  );
};

Button.displayName = "le-Button";

Button.defaultProps = {
  size: "medium",
  variant: "primary",
  rounded: true,
};
