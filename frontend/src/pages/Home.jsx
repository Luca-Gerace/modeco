import Hero from "../components/Hero/Hero"
import ImageCard from "../components/ImageCard/ImageCard"
import LicenseSection from "../components/Sections/License/LicenseSection"
import BlogSection from "../components/Sections/Blog/BlogSection"
import TrustSection from "../components/Sections/Trust/TrustSection"
import BrandSection from "../components/Sections/Brand/BrandSection"

export default function Home() {


  return (
    <>
      <Hero />
      <div className="flex flex-col gap-10 py-10 px-4 lg:px-0">
        <h1 className="text-[32px] md:text-[38px] text-black font-bold leading-10 md:leading-[50px]">Il <span className='text-green-500'>marketplace</span> che sostiene la tua scelta di <span className='text-green-500'>vita sostenibile</span></h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <ImageCard title='Abbigliamento' text='Selezione di prodotti sostenibili' link='/clothes' backgroundClass='bg-green-300' imageClass='bg-contain clothes' />
          <ImageCard title='Cibo e Bevande' text='Alimenti biologici e sostenibili' link='/food-and-beverage' backgroundClass='bg-[#74c9c9]' imageClass='bg-contain food_and_beverage' />
          <ImageCard title='Second Hand' text='Prodotti di seconda mano di qualità' link='/second-hand' backgroundClass='bg-[#74c9c9] md:bg-green-300' imageClass='bg-contain second_hand' />
          <ImageCard title='Cosmetici' text='Cosmetici naturali e cruelty-free' link='/cosmetics' backgroundClass='bg-green-300 md:bg-[#74c9c9]' imageClass='bg-contain cosmetics' />
        </div>
      </div>
      <LicenseSection />
      <BlogSection />
      <TrustSection />
      <BrandSection />
    </>
  )
}