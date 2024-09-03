import ProductSlider from '../components/Product/ProductSlider/ProductSlider';

export default function ShopSecondHand() {

  return (
    <>
      <ProductSlider
        filteredCategory="second hand"
        bgColor="bg-[#9146A1]"
        title="Abbigliamento Usato"
        subtitle="in offerta"
        altColor="text-green-500"
        textColor="text-white"
        link={`/products?category=${encodeURIComponent("second hand")}`}
        anchor="Vedi tutti i prodotti usati"
      />
    </>
  );
}