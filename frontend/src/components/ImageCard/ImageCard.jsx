import './ImageCard.css'
import { Link } from "react-router-dom";

export default function ImageCard({ title, text, link, backgroundClass, imageClass }) {

    return (
        <Link to={link} className="block">
            <div className={`${backgroundClass} h-[300px] relative rounded-xl overflow-hidden`}>
                <div className='shape circle'></div>
                <div className={`${imageClass} h-[300px] imageCard pb-8 rounded-xl flex items-start`}>
                    <div className="p-4 text-white drop-shadow-lg">
                        <h3 className="text-[22px] font-bold">{title}</h3>
                        { text && (
                            <p className='text-[20px]'>{text}</p>
                        )}
                    </div>
                </div>
                <div className='shape cube'></div>
            </div>
        </Link>
    );
}
