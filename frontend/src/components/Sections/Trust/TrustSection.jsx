import "./TrustSection.css";

export default function TrustSection() {
    return (
        <section className="w-full mt-8 px-0 imgBg min-h-[350px] relative">
            <div className="content text-white drop-shadow-lg w-full py-16 px-6 lg:px-10 flex flex-col gap-12 relative z-10">
                <h2 className="text-[26px] md:text-[34px] font-bold leading-8 md:leading-[40px]">
                    Diamo il via ad una <span className="text-green-500">rivoluzione</span> 100% sostenibile
                </h2>
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-[22px] lg:text-[28px]">Mission</h3>
                    <p className="text-[18px] lg:text-[20px]">
                        Essere il marketplace di riferimento per te e per tutti quelli che ci scelgono ogni giorno e che seguono uno stile di vita sostenibile.
                    </p>
                    <h3 className="font-bold text-[22px] lg:text-[28px] pt-4">Vision</h3>
                    <p className="text-[18px] lg:text-[20px]">
                        Proporti prodotti di qualità, adatti a tutti i tuoi bisogni ed esigenze con particolare attenzione alla produzione 100% sostenibile, senza compromessi. Tutti i nostri brand partner hanno certificati di produzione sostenibile.
                    </p>
                </div>
                <div className="flex items-center justify-between lg:justify-center gap-2 lg:gap-56">
                    <div className="flex flex-col items-center justify-center">
                        <p className="font-black text-[100px] tracking-wide">358</p>
                        <span className="font-bold text-[20px] -mt-8">alberi piantati</span>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <p className="font-black text-[100px] tracking-wide">
                            150<span className="text-[40px]">t</span>
                        </p>
                        <span className="font-bold text-[20px] -mt-8">di CO2 risparmiato</span>
                    </div>
                </div>
            </div>
            <div className="overlay absolute top-0 left-0 h-full w-full"></div>
        </section>
    );
}