import ProductSlider from '../components/Product/ProductSlider/ProductSlider';

export default function ShopClothes() {

  return (
    <>
      <ProductSlider
        filteredCategory="clothes"
        bgColor="bg-[#9146A1]"
        title="Abbigliamento"
        subtitle="in offerta"
        altColor="text-green-500"
        textColor="text-white"
        link={`/products?category=${encodeURIComponent("clothes")}`}
        anchor="Vedi tutti i prodotti di abbigliamento"
      />
    </>
  );
}