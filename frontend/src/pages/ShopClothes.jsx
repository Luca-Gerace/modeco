import ImageCard from '../components/ImageCard/ImageCard';
import ProductSlider from '../components/Product/ProductSlider/ProductSlider';
import LicenseSection from "../components/Sections/License/LicenseSection"
import BrandSection from "../components/Sections/Brand/BrandSection"

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
        <h1 className="text-[32px] md:text-[38px] text-black font-bold leading-10 md:leading-[50px]">
          Sei alla ricerca di un <span className='text-green-500'>prodotto sostenibile</span> in particolare?
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <ImageCard 
            title='T-shirt' 
            link={`/products?category=${encodeURIComponent("clothes")}&type=${encodeURIComponent("T-shirt")}`}
            backgroundClass='bg-green-300' 
            imageClass='w-full bg-contain tshirt' 
          />
          <ImageCard 
            title='Felpe' 
            link={`/products?category=${encodeURIComponent("clothes")}&type=${encodeURIComponent("Sweatshirt")}`}
            backgroundClass='bg-[#74c9c9]' 
            imageClass='w-full bg-contain sweatshirt' 
          />
          <ImageCard 
            title='Giacche' 
            link={`/products?category=${encodeURIComponent("clothes")}&type=${encodeURIComponent("Jacket")}`}
            backgroundClass='bg-[#74c9c9] md:bg-green-300' 
            imageClass='w-full bg-contain jacket' 
          />
          <ImageCard 
            title='Pantaloni' 
            link={`/products?category=${encodeURIComponent("clothes")}&type=${encodeURIComponent("Pants")}`}
            backgroundClass='bg-green-300 md:bg-[#74c9c9]' 
            imageClass='w-full bg-contain pants' 
          />
        </div>
      </div>
      <LicenseSection />
      <BrandSection />
    </>
  );
}