import { useState, useEffect } from 'react';
import { Button } from "@material-tailwind/react";
import { useUser } from "../modules/UserContext";
import { PencilIcon } from "@heroicons/react/24/outline";
import EditUserModal from '../components/User/EditUserModal';
import EditUserImageModal from '../components/User/EditUserImageModal';
import { getOrders } from '../services/api';

export default function Profile() {
  const { user, setUser } = useUser();
  const [orders, setOrders] = useState([]);
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [openEditProfileImage, setOpenEditProfileImage] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = (await getOrders()).slice().reverse();
        const userOrders = data.filter(order => order.userId._id === user._id);
        setOrders(userOrders);
        console.log(userOrders); // Verifica i dati ricevuti
      } catch (error) {
        console.error('Errore nel recupero degli ordini:', error);
      }
    };

    fetchOrders();
  }, [user._id]);

  const handleOpenEditProfile = () => setOpenEditProfile(!openEditProfile);
  const handleOpenEditProfileImage = () => setOpenEditProfileImage(!openEditProfileImage);

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8 items-center h-40">
          <img
            className="w-40 h-40 rounded-full border-2 border-green-500 cursor-pointer"
            src={user.avatar}
            alt={`${user.name}'s profile`}
            onClick={handleOpenEditProfileImage}
          />
          <div className="flex flex-col gap-4">
            <div className="mb-4">
              <h1 className="font-bold text-xl mb-2 text-[#96A7AF]">{user.name} {user.surname}</h1>
              <p className="text-xl font-bold">{user.email}</p>
            </div>
            <Button
              onClick={handleOpenEditProfile}
              className="flex items-center justify-center gap-4 w-full bg-[#000] text-white py-4 rounded-full capitalize text-[16px]"
              color="black"
            >
              <PencilIcon className="h-5 w-5" /> Edit Profile
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4 py-16">
          <h2 className="text-[20px] font-bold pb-4 border-b">I miei ordini</h2>
          {orders.length > 0 ? (
            orders.map(order => (
              <div key={order._id} className="border-b py-4 flex flex-col bg-white shadow-md rounded-lg p-4 my-4">
                <div className="flex justify-between items-center pb-2 mb-2 border-b">
                  <span className="font-bold text-lg text-gray-700">Status:</span>
                  <span className={`px-3 py-1 text-sm font-semibold rounded-lg ${order.status === 'pending' ? 'bg-yellow-200 text-yellow-800' : order.status === 'confirmed' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 mb-2 border-b">
                  <span className="font-bold text-lg text-gray-700">Data:</span>
                  <span className="text-gray-600">{new Date(order.createdAt).toLocaleDateString('it-IT')}</span>
                </div>
                <div className="flex justify-between items-center pb-2 mb-2 border-b">
                  <span className="font-bold text-lg text-gray-700">Order ID:</span>
                  <span className="text-gray-600">{order._id}</span>
                </div>
                <div className="flex justify-between items-center pb-2 mb-2 border-b">
                  <span className="font-bold text-lg text-gray-700">Prezzo:</span>
                  <span className="text-gray-600">{order.totalPrice.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between items-center pb-2 mb-2 border-b">
                  <span className="font-bold text-lg text-gray-700">Dati di spedizione:</span>
                  <span className="text-gray-600">{order.shippingAddress}</span>
                </div>
                <div className="flex justify-between items-center pb-2">
                  <span className="font-bold text-lg text-gray-700">Dati di pagamento:</span>
                  <span className="text-gray-600">{order.paymentMethod}</span>
                </div>
              </div>
            ))
          ) : (
            <p className='py-6'>Nessun ordine disponibile</p>
          )}
        </div>
      </div>

      <EditUserModal
        open={openEditProfile}
        handleOpen={handleOpenEditProfile}
        userData={user}
        setUser={setUser}
      />
      <EditUserImageModal
        open={openEditProfileImage}
        handleOpen={handleOpenEditProfileImage}
        user={user}
        setUser={setUser} 
      />
    </>
  );
}