import './LicenseSection.css'
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getLicenses } from "../../../services/api";
import { ArrowRightIcon } from '@heroicons/react/24/solid';

export default function CategoryCards() {
    const [allLicenses, setAllLicenses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLicenses = async () => {
          try {
            const data = await getLicenses();
            setAllLicenses(data);
            setLoading(true);
          } catch (error) {
            console.error('Errore nel recupero dei licenze:', error);
            setLoading(false);
          }
        };
        fetchLicenses();
      }, []);

    return (
        <section className='w-full mt-8 px-0'>
            <div className='w-full bg-[#88caca88] p-6 lg:p-8 flex flex-col gap-8 relative overflow-hidden'>
                <h2 className="text-[26px] md:text-[34px] text-black font-bold leading-8 md:leading-[40px]">La <span className='text-green-500'>sostenibilità</span> è la nostra forza</h2>
                <p className='text-[18px] lg:text-[20px]'>
                    Tutti i nostri brand partner hanno <strong>certificati di produzione sostenibile</strong>.
                    <br />
                    <br />
                    Noi contribuiamo rendendo la tua esperienza di acquisto <strong>100% rispettosa dell’ambiente</strong>, dal packaging fino al trasporto al tuo indirizzo.
                </p>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-6">
                    {loading ? (
                        allLicenses.map((license) => (
                        <img
                            key={license._id}
                            className="w-full h-auto border-green-500 border-2 rounded-xl"
                            src={license.image}
                            alt={license.name}
                        />
                        ))
                    ) : (
                        <p>Loading...</p> 
                    )}
                </div>
                <Link to='/licenze' className='flex gap-2 items-center flex-end text-black font-bold hover:underline justify-end'>
                    <span>Scopri di più</span> <ArrowRightIcon className='w-6' />
                </Link>
                <div className='licenseShape'></div>
            </div >
        </section>
    );
}
