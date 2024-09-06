import { useEffect, useState } from "react";
import { getBrands } from "../../../services/api";

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
        <section className='w-full mt-8'>
            <div className='w-full py-6 lg:py-8 flex flex-col gap-8 relative'>
                <h2 className="text-[26px] md:text-[34px] text-black font-bold leading-8 md:leading-[40px] px-4 lg:px-0">
                    Il Brand <span className='text-green-500'>Green</span> di mod<span className='text-green-500'>eco</span>
                </h2>
                <p className='text-[18px] lg:text-[20px] px-4 lg:px-0'>
                    Esplora articoli e approfondimenti su <strong>moda sostenibile</strong>, pratiche <strong>eco-friendly</strong> e consigli per uno <strong>stile di vita più consapevole</strong>, in armonia con il pianeta.
                </p>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-6">
                    {!loading ? (
                        allBrands.map((brand) => (
                        <img
                            key={brand._id}
                            className="w-full h-auto border-green-500 border-2 rounded-full"
                            src={brand.image}
                            alt={brand.name}
                        />
                        ))
                    ) : (
                        <p>Loading...</p> 
                    )}
                </div>
            </div >
        </section>
    );
}