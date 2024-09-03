import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrder } from "../../services/api";
import { PencilIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";
import EditOrderModal from "../../components/Order/EditOrderModal";

export default function Order() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState({});
  
  // Modals
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleEditModalOpen = () => setOpenEditModal(!openEditModal);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrder(id);
        setOrder(data);
      } catch (error) {
        console.error('Errore nel recupero del order:', error);
      }
    };

    fetchOrder();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <button onClick={handleBack} className="flex items-center gap-3 mb-4 px-4">
        <ArrowLeftIcon className="h-5 w-5" /> Go back
      </button>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col pb-8 w-full">
            <div className="flex justify-between mb-4">
              <h1 className="font-bold text-3xl text-[#96A7AF]">Order Id: <span className="font-normal">{order._id}</span></h1>
              <span
                className={`uppercase p-2 text-l font-bold rounded-lg ${
                  order.status === 'pending'
                    ? 'bg-gray-300 text-gray-900'
                    : order.status === 'cancelled'
                    ? 'bg-red-300 text-red-900'
                    : 'bg-green-300 text-green-900'
                }`}
              >
                {order.status}
              </span>
            </div>
            <div className="flex justify-between py-3 border-b">
              <strong>Date</strong>
              <span>{new Date(order.createdAt).toLocaleDateString('it-IT')}</span>
            </div>
            <div className="flex justify-between py-3 border-b">
              <strong>User name</strong>
              <span>{order.userId?.name} {order.userId?.surname}</span>
            </div>
            <div className="flex justify-between py-3 border-b">
              <strong>User email</strong>
              <span>{order.userId?.email}</span>
            </div>
            <div className="flex justify-between py-3 border-b">
              <strong>Shipping address</strong>
              <span>{order.shippingAddress}</span>
            </div>
            <div className="flex justify-between py-3 border-b">
              <strong>Payment method</strong>
              <span>{order.paymentMethod}</span>
            </div>
            <div className="flex justify-between py-3 border-b">
              <strong>Shipping cost</strong>
              <span>{order.shippingCost}&euro;</span>
            </div>
            <div className="flex justify-between py-3 border-b">
              <strong>Total price</strong>
              <span>{order.totalPrice?.toFixed(2)}&euro;</span>
            </div>
            <div className="flex justify-between py-3 border-b">
              <strong>Total quantity</strong>
              <span>{order.totalQuantity} products</span>
            </div>
            <div className="flex flex-col justify-between py-3">
              <strong>Products</strong>
              {order.items?.map((product, index) => (
                  <span key={index}>{product.quantity} items | {product.productId.name}</span>
              ))}
            </div>
          </div>
          {
            order.status === 'pending' && (
              <>
                <div className="w-screen p-6 bg-white fixed bottom-0 left-0 border-t-2 shadow-2xl">
                    <div className="w-full lg:w-[1024px] m-auto px-0 md:px-4 flex justify-between items-center">
                        <Button onClick={handleEditModalOpen} className="flex items-center px-4 gap-2 rounded-full">
                            <PencilIcon strokeWidth={2} className="h-4 w-4" /> Edit Order
                        </Button>
                    </div>
                </div>  
                <EditOrderModal open={openEditModal} handleOpen={handleEditModalOpen} orderData={order} setOrder={setOrder} />
              </>
            ) 
          } 
        </div>
    </>
  );
}