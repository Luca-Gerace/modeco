import { useEffect, useState } from "react";
import { getBrands } from "../../../services/api";
import SkeletonBrand from "../../Skeleton/SkeletonBrand";

export default function BrandSection() {
    const [allBrands, setAllBrands] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBrands = async () => {
          try {
            const data = await getBrands();
            setAllBrands(data);
            setLoading(false);
          } catch (error) {
            console.error('Errore nel recupero dei brand:', error);
            setLoading(false);
          }
        };
        fetchBrands();
    }, []);

    return (
        <section className='w-full mt-8 px-4 lg:px-0'>
            <div className='w-full py-4 flex flex-col gap-8 relative'>
                <h2 className="text-[26px] md:text-[34px] text-black font-bold leading-8 md:leading-[40px]">
                    I Nostri <span className='text-green-500'>Brand</span>
                </h2>
                <p className='text-[18px] lg:text-[20px]'>
                    Scopri la nostra selezione di <strong>brand premium</strong> che condividono il nostro impegno verso una <strong>moda sostenibile</strong> e <strong>responsabile</strong>. Ogni marchio è scelto con cura per garantire qualità e <strong>rispetto per l&apos;ambiente</strong>.
                </p>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-6">
                    {!loading ? (
                        allBrands
                        .slice(0, 8)
                        .map((brand) => (
                        <img
                            key={brand._id}
                            className="w-full h-auto border-green-500 border-2 rounded-full"
                            src={brand.image}
                            alt={brand.name}
                        />
                        ))
                    ) : (
                        <>
                            {Array.from({ length: 8 }).map((_, index) => (
                                <SkeletonBrand key={index} />
                            ))}
                        </>
                    )}
                </div>
            </div >
        </section>
    );
}