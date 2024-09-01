import { Typography } from "@material-tailwind/react";
 
export default function SkeletonPage() {
  return (
    <div className="animate-pulse flex flex-col md:flex-row md:space-x-8 pb-8">
        <div className="w-full md:w-1/2 bg-gray-300 rounded-xl relative mb-6 md:mb-0 h-[350px]">
            <div className="flex items-center justify-center h-[350px]">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="m-auto flex items-center justify-center h-24 w-24 text-gray-500"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
                </svg>
            </div>
        </div>
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