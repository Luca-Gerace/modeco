import ImageCard from '../../components/ImageCard/ImageCard';
import ProductSlider from '../../components/Product/ProductSlider/ProductSlider';
import LicenseSection from "../../components/Sections/License/LicenseSection"
import BrandSection from "../../components/Sections/Brand/BrandSection"

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
      <div className="flex flex-col gap-10 py-10 px-4 lg:px-0">
        <h1 className="text-[32px] md:text-[38px] text-black font-bold leading-10 md:leading-[50px]">
          Ti proponiamo solo <span className='text-green-500'>cibi e bevande biologici</span> di qualità
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <ImageCard 
            title='Piatti pronti' 
            link={`/products?category=${encodeURIComponent("food and beverage")}&type=${encodeURIComponent("dishes")}`}
            backgroundClass='bg-green-300' 
            imageClass='w-full bg-contain dishes' 
          />
          <ImageCard 
            title='Bevande' 
            link={`/products?category=${encodeURIComponent("food and beverage")}&type=${encodeURIComponent("beverage")}`}
            backgroundClass='bg-[#74c9c9]' 
            imageClass='w-full bg-contain beverage' 
          />
          <ImageCard 
            title='Stuzzichini' 
            link={`/products?category=${encodeURIComponent("food and beverage")}&type=${encodeURIComponent("apetizer")}`}
            backgroundClass='bg-[#74c9c9] md:bg-green-300' 
            imageClass='w-full bg-contain apetizers' 
          />
          <ImageCard 
            title='Dessert' 
            link={`/products?category=${encodeURIComponent("food and beverage")}&type=${encodeURIComponent("dessert")}`}
            backgroundClass='bg-green-300 md:bg-[#74c9c9]' 
            imageClass='w-full bg-contain desserts' 
          />
        </div>
      </div>
      <LicenseSection />
      <BrandSection />
    </>
  );
}