export default function Badge({ children, color }) {
    const colorClass = color === 'gray' ? 'bg-green-500' : 'bg-red-500';

    return (
        <Badge className={`absolute text-white top-2 right-2 ${colorClass} rounded-full p-1 shadow-md`}>
            {children}
        </Badge>
    );
}