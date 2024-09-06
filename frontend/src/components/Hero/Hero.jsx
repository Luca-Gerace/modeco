import './Hero.css'
import { Link } from 'react-router-dom';
import { Button } from "@material-tailwind/react";

export default function Hero() {
    return (
        <div className='hero w-full h-[250px] md:h-[350px] -mt-8 relative'>
            <div className='flex flex-col gap-3 absolute right-6 top-6 md:right-32 md:top-16 w-64 md:w-80'>
                <h2 className='text-[26px] md:text-[36px] text-white font-bold leading-8 md:leading-10'>Le <span className='text-green-500'>migliori offerte</span> scelte per te</h2>
                <p className='text-[20px] md:text-[24px] text-white'>Scopri tutti i prodotti in saldo fino al 50%</p>
                <Link to='/products?sale=true'>
                    <Button className='bg-green-500 rounded-full py-4'>Vedi prodotti</Button>
                </Link>
            </div>
        </div>
    )
}