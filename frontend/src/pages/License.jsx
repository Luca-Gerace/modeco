import { useEffect, useState } from "react";
import { getLicenses } from "../services/api";

export default function License() {
  const [licenses, setLicenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLicenses = async () => {
      try {
        const data = await getLicenses();
        setLicenses(data);
        setLoading(false);
      } catch (error) {
        console.error('Errore nel recupero delle licenze:', error);
        setLoading(false);
      }
    };

    fetchLicenses();
  }, []);

  return (
    <div className="flex flex-col gap-10 py-4 px-4 lg:px-0">
        <div className="w-full relative mb-6 md:mb-0 h-[350px]">
            <img className="w-full h-[350px] object-cover rounded-xl" src='https://res.cloudinary.com/dicfymkdl/image/upload/v1725620278/certificati-sostenibilita_smtqrm.jpg' alt='certificati di sostenibilità' />
        </div>
        <div className="flex flex-col gap-6">
            <h1 className="text-[32px] md:text-[38px] text-black font-bold leading-10 md:leading-[50px]">
                I <span className='text-green-500'>Certificati</span> di produzione <span className='text-green-500'>sostenibile</span>
            </h1>
            <p className='text-[18px] lg:text-[20px] px-4 lg:px-0'>
              Tutti i prodotti rispettano <strong>rigorosi standard di produzione</strong>, garantendo trasparenza, etica e un <strong>impatto ridotto sull&apos;ambiente</strong>. Dai materiali ai metodi di lavorazione, ci impegniamo a offrirti solo <strong>prodotti di qualità</strong> di brand che rispettano e <strong>proteggono il nostro pianeta</strong>.
            </p>
            <ul className="flex flex-col gap-8 pt-6">
                { !loading && (
                    <>
                        {licenses.map((license) => (
                            <li key={license._id} className="flex gap-6 items-start pb-8 border-b last:pb-0 last:border-0">
                                <img src={license.image} className="w-24 h-24 rounded-full border border-green-500" />
                                <div className="flex flex-col">
                                    <h2 className="font-bold text-[22px] pb-3">{license.name}</h2>
                                    <p className='text-[18px] lg:text-[20px]'>{license.description}</p>
                                </div>
                            </li>
                        ))}
                    </>
                )}
            </ul>
        </div>
    </div>
  );
}