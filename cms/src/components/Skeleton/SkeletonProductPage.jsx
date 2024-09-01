import { Typography } from "@material-tailwind/react";
 
export default function SkeletonProductPage() {
  return (
    <div className="animate-pulse flex flex-col md:flex-row md:space-x-8 pb-8">
        <div className="w-full md:w-1/2 bg-gray-300 rounded-xl relative mb-6 md:mb-0"></div>
        <div className="md:w-1/2 flex flex-col gap-8">
            <div>
                <Typography
                        as="h1"
                        variant="paragraph"
                        className="h-9 w-full rounded-full bg-gray-300 mb-4"
                    >
                        &nbsp;
                </Typography>
                <Typography
                        as="p"
                        variant="paragraph"
                        className="h-[72px] w-full rounded-full bg-gray-300 mb-4"
                    >
                        &nbsp;
                </Typography>
                <Typography
                        as="p"
                        variant="paragraph"
                        className="h-12 w-full rounded-full bg-gray-300 mb-4"
                    >
                        &nbsp;
                </Typography>
                <Typography
                        as="p"
                        variant="paragraph"
                        className="h-12 w-full rounded-full bg-gray-300 mb-4"
                    >
                        &nbsp;
                </Typography>
            </div>
        </div>
    </div>
  );
}