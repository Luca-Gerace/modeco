export default function Badge({ children, color }) {
    const colorClass = color === 'gray' ? 'bg-gray-500' : 'bg-red-500';

    return (
        <div className={`${colorClass} absolute text-[12px] text-white top-2.5 left-2.5 rounded-full py-1 px-2 shadow-md`}>
            {children}
        </div>
    );
}