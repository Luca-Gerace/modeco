import {
    Typography,
  } from "@material-tailwind/react";

export default function SkeletonProductCard() {
    return (
        <div className="flex flex-col w-full">
            <Typography variant="div" className="animate-pulse w-full h-[219px] md:h-[258px] bg-[#EDF1FA] rounded-xl">
                &nbsp;
            </Typography>
            <div className="py-4">
                <Typography variant="p" className="animate-pulse h-6 w-full bg-[#EDF1FA] rounded-full mb-2">
                    &nbsp;
                </Typography>
                <Typography variant="h3" className="animate-pulse h-12 w-full bg-[#EDF1FA] rounded-xl mb-2">
                    &nbsp;
                </Typography>
                <Typography variant="p" className="animate-pulse h-6 w-full bg-[#EDF1FA] rounded-full">
                    &nbsp;
                </Typography>
            </div>
        </div>
      );
}