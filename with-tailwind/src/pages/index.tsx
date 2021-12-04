import { CardProduct, Layout } from "@app/components";
import { useProducts } from "@app/lib";
import React from "react";
function Index() {
  const { products } = useProducts();
  return (
    <Layout>
      <h2 className="py-3 font-sans text-4xl italic font-bold text-center border-none">
        Productos
      </h2>
      <div className="grid grid-cols-4 gap-2 my-4 place-items-center">
        {products?.map((product, i) => (
          <CardProduct product={product} key={i} />
        ))}
      </div>
    </Layout>
  );
}

export default Index;
