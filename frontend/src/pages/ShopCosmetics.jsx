import ProductSlider from '../components/Product/ProductSlider/ProductSlider';

export default function ShopCosmetics() {

  return (
    <>
      <ProductSlider
        filteredCategory="cosmetics"
        bgColor="bg-[#9146A1]"
        title="Cosmetici"
        subtitle="in offerta"
        altColor="text-green-500"
        textColor="text-white"
        link={`/products?category=${encodeURIComponent("cosmetics")}`}
        anchor="Vedi tutti i prodotti di cosmetica"
      />
    </>
  );
}