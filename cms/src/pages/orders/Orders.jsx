import { useEffect, useState } from "react";
import { getOrders } from "../../services/api";
import TableHeader from "../../components/Table/TableHeader";
import TableBody from "../../components/Table/TableBody";
import OrderRow from "../../components/Order/OrderRow";

export default function Orders() {
  const [allOrders, setAllOrders] = useState([]);
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = (await getOrders()).slice().reverse();
        setAllOrders(data);
        setLoading(false);
      } catch (error) {
        console.error('Errore nel recupero dei order:', error);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    const filteredData = allOrders.filter(order => {
      const userEmail = order.userId.email.toLowerCase();
      const searchLower = searchTerm.toLowerCase();
      return userEmail.includes(searchLower);
    });
    setOrders(filteredData);
  }, [searchTerm, allOrders]);

  const tableHeaders = ["Date", "User email", "Address", "Items", "Price", "Status", "Order details"];

  return (
    <div className="px-4">
      <TableHeader
        title="Orders List"
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
      >
      </TableHeader>
      <TableBody
        theads={tableHeaders}
        rows={orders}
        loading={loading}
        emptyText="No orders found"
        RowComponent={OrderRow}
        modal={''}
      />
    </div>
  );
}
