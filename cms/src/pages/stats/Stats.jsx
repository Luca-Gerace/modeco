import {
    Typography,
  } from "@material-tailwind/react";
import Charts from "../../components/Chart";

export default function Stats() {
    return (
        <section className="px-4 md:px-0 py-3">
            <Typography variant="h2" color="blue-gray" className="pb-6">Incomes</Typography>
            <Charts />
        </section>
    )
}