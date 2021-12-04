import React from "react";
import { useRouter } from "next/router";
import { useProduct, useSimilarProducts } from "@app/lib/product-api";
import { Layout } from "@app/components";
import NextImage from "next/image";
import { Button } from "@app/ui";
import { Price } from "@app/components";
import { makeCopies } from "@app/utils";
import { CardProduct } from "@app/components";
function Product() {
  const router = useRouter();
  const { id } = router.query as unknown as { id: number };
  const { isLoading, product } = useProduct(id);
  const { products } = useSimilarProducts(id);
  if (isLoading || !product) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      {/* product */}
      <div className="flex flex-row max-w-screen-lg mx-auto mt-5">
        <div className="w-2/4">
          <NextImage
            src={product?.image_url}
            objectFit="cover"
            width="400"
            height="400"
          />
        </div>
        <div className="w-2/4">
          <div className="space-y-5">
            <h1 className="my-2 text-5xl italic font-bold text-black">
              {product?.title}
            </h1>
            <span className="text-2xl font-bold text-black">
              <Price>{product?.price}</Price>
            </span>
            <p className="">{product?.description}</p>
            <Button>comprar</Button>
          </div>
        </div>
      </div>
      {/* recommended products */}
      <div className="max-w-screen-lg mx-auto mt-10">
        <h1 className="my-2 text-3xl italic font-bold text-center text-black">
          Productos recomendados
        </h1>
        <div className="flex flex-row justify-center mt-5 gap-x-8">
          {products &&
            products.map((product) => (
              <CardProduct key={product.id} product={product} />
            ))}
        </div>
      </div>
    </Layout>
  );
}

export default Product;
