import { useEffect, useState } from "react";
import { getOrders } from "../../services/api";
import SkeletonStats from "../../components/Skeleton/SkeletonStats";
import RevenueChart from "../../components/Charts/RevenueChart";
import OrdersChart from "../../components/Charts/OrdersChart";

export default function Stats() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await getOrders();
        // Filter orders with status completed
        const completedOrders = data.filter(order => order.status === 'confirmed');
        setOrders(completedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  return (
    <section className="px-4 md:px-0 py-3 flex flex-col gap-16">
      { loading ? (
        <>
            {Array.from({ length: 2 }).map((_, index) => (
                <SkeletonStats key={index} />
            ))}
        </>
      ) : (
        <>
            <RevenueChart orders={orders} />
            <OrdersChart orders={orders} />
        </>
      )}
    </section>
  );
}