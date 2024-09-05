import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Typography,
  Select,
  Option,
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
    <React.Suspense fallback={<div>Loading chart...</div>}>
      <Chart type="area" height={height} series={series} options={chartOptions} />
    </React.Suspense>
  );
}

export default function OrdersChart({ orders }) {
  const [series, setSeries] = useState([]);
  const [totalOrderCount, setTotalOrderCount] = useState(0);
  const [timeRange, setTimeRange] = useState('lastMonth');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const now = new Date();
    let startDate;
    let tempCategories = [];
    const orderCounts = [];
    let totalOrders = 0;

    if (timeRange === 'lastYear') {
      startDate = new Date(now.getFullYear(), 0, 1);
      tempCategories = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      orderCounts.length = 12;
      orderCounts.fill(0);
    } else if (timeRange === 'lastMonth') {
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
      startDate = new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1);
      const daysInLastMonth = new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0).getDate();
      tempCategories = Array.from({ length: daysInLastMonth }, (_, i) => `${i + 1}`);
      orderCounts.length = daysInLastMonth;
      orderCounts.fill(0);
    } else if (timeRange === 'lastWeek') {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
      tempCategories = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      orderCounts.length = 7;
      orderCounts.fill(0);
    }

    orders.forEach(order => {
      const orderDate = new Date(order.createdAt);

      if (orderDate >= startDate && orderDate <= now) {
        if (timeRange === 'lastYear') {
          const monthIndex = orderDate.getMonth();
          orderCounts[monthIndex] += 1; // Contiamo gli ordini
        } else if (timeRange === 'lastMonth') {
          const dayOfMonth = orderDate.getDate() - 1;
          orderCounts[dayOfMonth] += 1; // Contiamo gli ordini
        } else if (timeRange === 'lastWeek') {
          const dayOfWeek = orderDate.getDay();
          const mappedDay = (dayOfWeek === 0 ? 6 : dayOfWeek - 1);
          orderCounts[mappedDay] += 1; // Contiamo gli ordini
        }
        totalOrders += 1;
      }
    });

    setSeries([{ name: "Orders", data: orderCounts }]);
    setCategories(tempCategories);
    setTotalOrderCount(totalOrders);
  }, [orders, timeRange]);

  return (
    <div>
      <Typography variant="h2" color="blue-gray" className="pb-6">
        Number of Orders
      </Typography>
      <Card className="border">
        <CardBody className="!p-2">
          <div className="flex gap-3 flex-col md:flex-row justify-between items-center px-4 !mt-4">
            <Typography variant="h3" color="blue-gray" className="h-11">
              {totalOrderCount} Orders
            </Typography>
            <div className="w-full md:w-40 mr-0 md:mr-10">
              <Select value={timeRange} onChange={(e) => setTimeRange(e)} label="Filter by Time Range">
                <Option value="lastYear">Last Year</Option>
                <Option value="lastMonth">Last Month</Option>
                <Option value="lastWeek">Last Week</Option>
              </Select>
            </div>
          </div>
          <AreaChart
            colors={["#9146A1"]}
            options={{
              xaxis: {
                categories: categories,
              },
            }}
            series={series}
          />
        </CardBody>
      </Card>
    </div>
  );
}
