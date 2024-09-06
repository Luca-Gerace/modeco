import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function ThankYou() {
  return (
    <div className='px-4'>
        <div className='flex flex-col gap-4 w-full md:w-[500px] mx-auto p-6 my-8'>
            <h1 className="text-[36px] font-bold text-center mb-4">Ordine effettuato</h1>
            <div className="flex flex-col mt-2 gap-3 pb-24">
                <Link to='/profile'>
                  <Button  className="bg-green-500 w-full justify-center flex items-center m-auto gap-3 rounded-full p-4" size="sm">
                      Vai ai tuoi ordini
                  </Button>
                </Link>
                <span className="px-4 m-auto mb-2">oppure</span>
                <Link to='/'>
                  <Button  variant='outlined' className="w-full justify-center flex items-center m-auto gap-3 rounded-full p-4" size="sm">
                      Torna in home
                  </Button>
                </Link>
            </div>
        </div>
    </div>
  );
}