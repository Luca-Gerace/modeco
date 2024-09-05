import React, { Suspense, useEffect, useState } from "react";
import { getOrders } from '../services/api';
import {
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import merge from "deepmerge";

const Chart = React.lazy(() => import("react-apexcharts"));

function AreaChart({ height = 350, series, colors, options }) {
  const chartOptions = React.useMemo(
    () => ({
      colors,
      ...merge(
        {
          chart: {
            height: height,
            type: "area",
            zoom: {
              enabled: false,
            },
            toolbar: {
              show: false,
            },
          },
          title: {
            show: "",
          },
          dataLabels: {
            enabled: false,
          },
          legend: {
            show: false,
          },
          markers: {
            size: 0,
            strokeWidth: 0,
            strokeColors: "transparent",
          },
          stroke: {
            curve: "smooth",
            width: 2,
          },
          grid: {
            show: true,
            borderColor: "#EEEEEE",
            strokeDashArray: 5,
            xaxis: {
              lines: {
                show: true,
              },
            },
            padding: {
              top: 5,
              right: 20,
            },
          },
          tooltip: {
            theme: "light",
          },
          yaxis: {
            show: false,
          },
          xaxis: {
            show: false,
          },
          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0,
              opacityTo: 1,
              stops: [0, 100],
            },
          },
        },
        options ? options : {}
      ),
    }),
    [height, colors, options]
  );

  return (
    <Suspense fallback={<div>Loading chart...</div>}>
      <Chart type="area" height={height} series={series} options={chartOptions} />
    </Suspense>
  );
}

export default function Charts() {
  const [series, setSeries] = useState([]);
  const [totalPriceSum, setTotalPriceSum] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const orders = await getOrders();
    
        const totalPrice = new Array(12).fill(0);
        let totalSum = 0;
        
        orders.forEach(order => {
          const orderDate = new Date(order.createdAt);
          const monthIndex = orderDate.getMonth();
          
          if (orderDate.getFullYear() === 2024) {
            totalPrice[monthIndex] += order.totalPrice; // Somma il totalPrice per quel mese
          }
          
          totalSum += order.totalPrice; // Somma totale di tutti i totalPrice
        });

        // Imposta i dati del grafico e il totale globale
        setSeries([
          {
            name: "Income",
            data: totalPrice,
          },
        ]);
        setTotalPriceSum(totalSum);
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <Card className="border">
      <CardBody className="!p-2">
        <div className="flex gap-2 flex-wrap justify-between px-4 !mt-4 ">
          <Typography variant="h3" color="blue-gray">
            &euro; {totalPriceSum.toFixed(2)}
          </Typography>
        </div>
        {/** chart */}
        <AreaChart
          colors={["#9146A1", "#4caf50"]}
          options={{
            xaxis: {
              categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
            },
          }}
          series={series}
        />
      </CardBody>
    </Card>
  );
}
