import { useAuthStore } from '../store/useAuthStore';
import { Camera, User, Mail } from 'lucide-react';
import { useState } from 'react';



const ProfilePage = () => {
    const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
    const [selectedImg, setSelectedImg] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = async() => {
            const base64Image = reader.result;
            setSelectedImg(base64Image);
            await updateProfile({ profilePicture: base64Image });
        }
    }

    return (
        <div className="h-screen pt-20">
            <div className="max-w-2xl mx-auto p-4 py-8">
                <div className="bg-base-300 rounded-xl p-6 space-y-8">
                    <div className="text-center">
                        <h1 className="text-2xl font-semibold"> <span className='text-gradient'>Profile</span></h1>
                        <p className="mt-2">Your profile Information</p>
                    </div>

                    {/* profile image section */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative">
                            <div className="p-1 rounded-full bg-gradient-to-r from-[#EA8D8D] to-[#A890FE]">
                                <img
                                    src={selectedImg || authUser.profilePicture || "/avatar.png"}
                                    alt="Profile"
                                    className="size-32 rounded-full object-cover"
                                />
                            </div>
                            <label
                                htmlFor="avatar-upload"
                                className={`
                                absolute bottom-0 right-0 
                                bg-gradient-to-r from-[#EA8D8D] to-[#A890FE] hover:scale-105
                                p-2 rounded-full cursor-pointer 
                                transition-all duration-200
                                ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                                `}
                            >
                                <Camera className="w-5 h-5 text-white" />
                                <input
                                    type="file"
                                    id="avatar-upload"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={isUpdatingProfile}
                                />
                            </label>
                        </div>
                        <p className="text-sm text-zinc-400">
                            {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
                        </p>

                    </div>

                    {/* user profile information section */}
                    <div className="space-y-6">
                        <div className="space-y-1.5 ">
                            <div className="text-sm text-zinc-400 flex items-center gap-2 text-gradient">
                                <User className="w-4 h-4 text-[#38EF7D]" />
                                <span className="text-gradient">Full Name</span>
                            </div>
                            <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.fullname}</p>
                        </div>

                        <div className="space-y-1.5">
                            <div className="text-sm text-zinc-400 flex items-center gap-2">
                                <Mail className="w-4 h-4 text-[#38EF7D]" />
                                <span className="text-gradient">Email Address</span>
                            </div>
                            <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.email}</p>
                        </div>
                    </div>
                    

                    {/* account information section */}
                    <div className="mt-6 bg-base-300 rounded-xl p-6">
                        <h2 className="text-lg font-medium  mb-4"> <span className='text-gradient'>Account Information</span></h2>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                                <span className='text-right-gradient'>Member Since</span>
                                <span>{authUser.createdAt?.split("T")[0]}</span>
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <span className='text-right-gradient'> Account Status</span>
                                <span className="text-green-500">Active</span>
                            </div>
                        </div>
                    </div>


                </div>                
            </div>
        </div>

    )
}

export default ProfilePage