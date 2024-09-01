import './CategoryCards.css'
import { Link } from "react-router-dom";

export default function CategoryCards() {

    const CATEGORIES = [
        {
            title: "Abbigliamento",
            text: "Esplora la selezione di abbigliamento sostenibile.",
            link: "/clothes",
            background: "bg-green-300",
            imageClass: "clothes"
        },
        {
            title: "Cibo e Bevande",
            text: "Scegli alimenti biologici e sostenibili.",
            link: "/food-and-beverage",
            background: "bg-[#74c9c9]",
            imageClass: "food_and_beverage"
        },
        {
            title: "Second Hand",
            text: "Trova prodotti di seconda mano di qualità.",
            link: "/second-hand",
            background: "bg-green-300",
            imageClass: "second_hand"
        },
        {
            title: "Cosmetici",
            text: "Scopri cosmetici naturali e cruelty-free.",
            link: "/cosmetics",
            background: "bg-[#74c9c9]",
            imageClass: "cosmetics"
        },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {CATEGORIES.map((category, index) => (
                <Link key={index} to={category.link} className="block">
                    <div className={`${category.background} relative h-[300px] rounded-xl overflow-hidden`}>
                        <div className='shape circle'></div>
                        <div className={`${category.imageClass} h-[300px] categoryCard pb-8 rounded-xl flex items-start`}>
                            <div className="p-4 text-white drop-shadow-lg">
                                <h3 className="text-xl font-bold">{category.title}</h3>
                                <p>{category.text}</p>
                            </div>
                        </div>
                        <div className='shape cube'></div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
