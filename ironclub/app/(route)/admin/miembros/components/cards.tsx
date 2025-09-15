type Props = {
    icon?: React.ReactNode;
    bgColor: string;
    name: string;
    metric: number;
};
export default function Cards({ icon, bgColor, name, metric }: Props) {
    return (
        <div className="flex bg-white border border-gray-300 rounded-lg p-4 gap-6">
            <div
                className={`${bgColor}  rounded-xl items-center justify-center flex  px-4`}
            >
                {icon}
            </div>
            <div className="flex flex-col ">
                <p className="text-sm text-gray-600">{name}</p>
                <span className="font-bold text-2xl">{metric}</span>
            </div>
        </div>
    );
}
