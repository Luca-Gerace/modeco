import ImageCard from '../../components/ImageCard/ImageCard';
import ProductSlider from '../../components/Product/ProductSlider/ProductSlider';
import LicenseSection from "../../components/Sections/License/LicenseSection"
import BrandSection from "../../components/Sections/Brand/BrandSection"

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
      <div className="flex flex-col gap-10 py-10 px-4 lg:px-0">
        <h1 className="text-[32px] md:text-[38px] text-black font-bold leading-10 md:leading-[50px]">
          Prodotti <span className='text-green-500'>biologici</span> selezionati per il tuo <span className='text-green-500'>benessere</span>
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <ImageCard 
            title='Profumi' 
            link={`/products?category=${encodeURIComponent("cosmetics")}&type=${encodeURIComponent("Parfum")}`}
            backgroundClass='bg-green-300' 
            imageClass='w-full bg-contain parfums' 
          />
          <ImageCard 
            title='Per il corpo' 
            link={`/products?category=${encodeURIComponent("cosmetics")}&type=${encodeURIComponent("Lotion")}`}
            backgroundClass='bg-[#74c9c9]' 
            imageClass='w-full bg-contain lotions' 
          />
          <ImageCard 
            title='Per il viso' 
            link={`/products?category=${encodeURIComponent("cosmetics")}&type=${encodeURIComponent("Beauty")}`}
            backgroundClass='bg-[#74c9c9] md:bg-green-300' 
            imageClass='w-full bg-contain beauty' 
          />
          <ImageCard 
            title='Trucchi' 
            link={`/products?category=${encodeURIComponent("cosmetics")}&type=${encodeURIComponent("Makeup")}`}
            backgroundClass='bg-green-300 md:bg-[#74c9c9]' 
            imageClass='w-full bg-contain makeup' 
          />
        </div>
      </div>
      <LicenseSection />
      <BrandSection />
    </>
  );
}