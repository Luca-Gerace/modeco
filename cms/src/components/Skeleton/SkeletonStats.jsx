import {
    Card,
    CardBody,
    Typography,
  } from "@material-tailwind/react";

export default function SkeletonStats() {
    return (
        <div>
            <Typography variant="h2" className="h-11 w-72 rounded-full bg-gray-300 mb-6">
                &nbsp;
            </Typography>
            <Card className="border">
            <CardBody className="animate-pulse !p-2">
                <div className="flex gap-3 flex-col md:flex-row justify-between items-center mb-4 !mt-4 px-4">
                    <Typography
                        as="h3"
                        variant="paragraph"
                        className="h-11 w-72 rounded-full bg-gray-300"
                    >
                        &nbsp;
                    </Typography>
                <div className="w-full md:w-40">
                    <Typography
                        as="p"
                        variant="paragraph"
                        className="h-11 w-full rounded-full bg-gray-300"
                    >
                        &nbsp;
                    </Typography>
                </div>
                </div>
                    <div className="px-4 pb-4">
                        <Typography
                            as="div"
                            className="h-[333px] w-full rounded-xl bg-gray-300"
                        >
                            &nbsp;
                        </Typography>
                    </div>
            </CardBody>
            </Card>
        </div>
      );
}