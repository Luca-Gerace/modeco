import { useState } from 'react';
import { Button } from "@material-tailwind/react";
import { useUser } from "../modules/UserContext";
import { PencilIcon } from "@heroicons/react/24/outline";
import EditUserModal from '../components/User/EditUserModal';
import EditUserImageModal from '../components/User/EditUserImageModal';

export default function Profile() {
  const { user, setUser } = useUser();
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [openEditProfileImage, setOpenEditProfileImage] = useState(false);

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