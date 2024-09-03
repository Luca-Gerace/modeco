import ProductSlider from '../components/Product/ProductSlider/ProductSlider';

export default function ShopFoodAndBaverage() {

  return (
    <>
      <ProductSlider
        filteredCategory="food and beverage"
        bgColor="bg-[#9146A1]"
        title="Cibo e Bevande"
        subtitle="in offerta"
        altColor="text-green-500"
        textColor="text-white"
        link={`/products?category=${encodeURIComponent("food and beverage")}`}
        anchor="Vedi tutti i prodotti di cibo e bevande"
      />
    </>
  );
}