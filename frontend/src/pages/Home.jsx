import Hero from "../components/Hero/Hero"
import CategoryCards from "../components/ImageCard/CategoryCards"
import LicenseSection from "../components/Sections/License/LicenseSection"
import BlogSection from "../components/Sections/Blog/BlogSection"
import TrustSection from "../components/Sections/Trust/TrustSection"

export default function Home() {


  return (
    <>
      <Hero />
      <div className="flex flex-col gap-10 py-10 px-4 lg:px-0">
        <h1 className="text-[32px] md:text-[38px] text-black font-bold leading-10 md:leading-[50px]">Il <span className='text-green-500'>marketplace</span> che sostiene la tua scelta di <span className='text-green-500'>vita sostenibile</span></h1>
        <CategoryCards />
      </div>
      <LicenseSection />
      <BlogSection />
      <TrustSection />
    </>
  )
}