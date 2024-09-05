import { Link } from "react-router-dom";
import {
    Card,
    CardBody,
    Typography,
    Button,
  } from "@material-tailwind/react";
  
  export function IconizedCard({ title, icon: Icon, link }) {
    return (
      <Card className="border-2">
        <CardBody className="flex flex-col items-center gap-6">
          {Icon && <Icon className="w-10 h-10" />}
          <div className="flex flex-col gap-6">
            <Typography variant="h4" className="text-center">
                {title}
            </Typography>
            <Link to={link} className="m-auto">
                <Button size="sm" className="rounded-full py-4 px-8">
                Visit section
                </Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    );
  }
  