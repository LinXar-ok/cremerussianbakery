import ProductDetail from "@/components/products/ProductDetail";
import { Metadata } from "next";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  // In a real app, you would fetch product data here
  const productName = "Product Name"; // Fetch this from your data source

  return {
    title: `${productName} - Crème Russian Bakery`,
    description: `Details about ${productName} at Crème Russian Bakery`,
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <div className="pt-24 pb-20">
      <ProductDetail productId={params.id} />
    </div>
  );
}
