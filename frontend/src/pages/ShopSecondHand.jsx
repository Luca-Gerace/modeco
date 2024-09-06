import ImageCard from '../components/ImageCard/ImageCard';
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
            <div className="flex flex-col gap-10 py-10 px-4 lg:px-0">
        <h1 className="text-[32px] md:text-[38px] text-black font-bold leading-10 md:leading-[50px]">
          Ti proponiamo solo <span className='text-green-500'>prodotti usati</span> in ottime condizioni
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <ImageCard 
            title='T-shirt' 
            link={`/products?category=${encodeURIComponent("second hand")}&type=${encodeURIComponent("T-shirt")}`}
            backgroundClass='bg-green-300' 
            imageClass='w-full bg-contain tshirt' 
          />
          <ImageCard 
            title='Felpe' 
            link={`/products?category=${encodeURIComponent("second hand")}&type=${encodeURIComponent("Sweatshirt")}`}
            backgroundClass='bg-[#74c9c9]' 
            imageClass='w-full bg-contain sweatshirt' 
          />
          <ImageCard 
            title='Giacche' 
            link={`/products?category=${encodeURIComponent("second hand")}&type=${encodeURIComponent("Jacket")}`}
            backgroundClass='bg-[#74c9c9] md:bg-green-300' 
            imageClass='w-full bg-contain jacket' 
          />
          <ImageCard 
            title='Pantaloni' 
            link={`/products?category=${encodeURIComponent("second hand")}&type=${encodeURIComponent("Pants")}`}
            backgroundClass='bg-green-300 md:bg-[#74c9c9]' 
            imageClass='w-full bg-contain pants' 
          />
        </div>
      </div>
    </>
  );
}