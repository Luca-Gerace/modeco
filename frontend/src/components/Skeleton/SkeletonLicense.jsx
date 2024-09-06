import { Typography } from "@material-tailwind/react";

export default function SkeletonLicense() {
    return (
        <Typography variant="paragraph" className="animate-pulse w-full h-[105px] md:h-[99px] bg-[#EDF1FA] rounded-xl">
            &nbsp;
        </Typography>
      );
}