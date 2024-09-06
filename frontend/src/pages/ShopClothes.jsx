import ImageCard from '../components/ImageCard/ImageCard';
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
      <div className="flex flex-col gap-10 py-10 px-4 lg:px-0">
        <h1 className="text-[32px] md:text-[38px] text-black font-bold leading-10 md:leading-[50px]">Il <span className='text-green-500'>marketplace</span> che sostiene la tua scelta di <span className='text-green-500'>vita sostenibile</span></h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <ImageCard title='T-shirt' link='/clothes' backgroundClass='bg-green-300' imageClass='w-full bg-contain tshirt' />
          <ImageCard title='Felpe' link='/food-and-beverage' backgroundClass='bg-[#74c9c9]' imageClass='w-full bg-contain sweatshirt' />
          <ImageCard title='Giacche' link='/second-hand' backgroundClass='bg-[#74c9c9] md:bg-green-300' imageClass='w-full bg-contain jacket' />
          <ImageCard title='Pantaloni'  link='/cosmetics' backgroundClass='bg-green-300 md:bg-[#74c9c9]' imageClass='w-full bg-contain pants' />
        </div>
      </div>
    </>
  );
}