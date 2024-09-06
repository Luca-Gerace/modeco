import { Typography } from "@material-tailwind/react";

export default function SkeletonBrand() {
    return (
        <Typography variant="paragraph" className="animate-pulse w-full h-[108px] md:h-[107px] bg-[#EDF1FA] rounded-full">
            &nbsp;
        </Typography>
      );
}