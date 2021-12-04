import { Product } from "@app/common";
import { Button } from "@app/ui";
import React from "react";
import NextLink from "next/link";

export const CardProduct: React.FC<{
  product?: Product;
}> = ({ product }) => {
  const shortDescription = (text: string, num: number) =>
    text.split(" ").slice(0, num).join(" ");
  if (!product) {
    return null;
  }
  return (
    <div className="bg-brand-secondary my-4 p-4 rounded-lg w-[250px] h-[320px] flex flex-col gap-3">
      <img
        className="block object-cover rounded-md max-h-[150px]"
        src={`${product.image_url}`}
        alt=""
      />
      <div>
        <h3 className="text-lg italic font-semibold text-left text-white">
          {shortDescription(product.title, 5)}
        </h3>
        <span className="font-sans text-sm font-semibold text-white">
          {product.price}
        </span>
        <div className="my-2">
          <NextLink href={`/product/${product.id}`}>
            <Button className="w-full">Comprar</Button>
          </NextLink>
        </div>
      </div>
    </div>
  );
};
