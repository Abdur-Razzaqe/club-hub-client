import { useState } from "react";
import coverImg from "../../assets/AuthImage.jpg";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import { updateProfile, updatePassword } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import Modal from "../Common/Modal";
import { useTheme } from "../../contexts/ThemeContext/ThemeContext";
import { User, Mail, ShieldCheck, Camera, KeyRound } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  const [role] = useRole();
  const { isDark } = useTheme();

  const [openUpdate, setOpenUpdate] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Profile Update Logic
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;

    try {
      setLoading(true);
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });
      alert("Profile updated successfully!");
      setOpenUpdate(false);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Password Change Logic
  const handleChangePassword = async (e) => {
    e.preventDefault();
    const password = e.target.password.value;

    if (password.length < 6) {
      return alert("Password must be at least 6 characters");
    }

    try {
      setLoading(true);
      await updatePassword(auth.currentUser, password);
      alert("Password updated successfully!");
      setOpenPassword(false);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Dynamic Styles
  const cardBg = isDark
    ? "bg-[#0b0514] border-white/5"
    : "bg-white border-gray-100 shadow-xl";
  const btnStyle = isDark
    ? "bg-pink-600 hover:bg-pink-700 shadow-lg shadow-pink-500/20"
    : "bg-teal-600 hover:bg-teal-700 shadow-lg shadow-teal-500/20";

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-[80vh] transition-colors duration-500`}
    >
      <div
        className={`relative overflow-hidden rounded-[32px] border w-full max-w-2xl ${cardBg}`}
      >
        {/* --- Cover Image --- */}
        <div className="relative h-48 w-full">
          <img
            src={coverImg}
            alt="cover"
            className="w-full h-full object-cover opacity-80"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-t ${isDark ? "from-[#0b0514]" : "from-white"}`}
          />
        </div>

        {/* --- Profile Info Section --- */}
        <div className="relative flex flex-col items-center px-6 pb-10 -mt-20">
          {/* Profile Photo */}
          <div className="relative">
            <img
              src={
                user?.photoURL ||
                "https://i.ibb.co/vz6m6mS/user-placeholder.png"
              }
              alt="profile"
              className={`w-32 h-32 rounded-3xl object-cover border-4 shadow-2xl ${isDark ? "border-pink-500/50" : "border-white"}`}
            />
            <div
              className={`absolute -bottom-2 -right-2 p-2 rounded-xl border ${isDark ? "bg-pink-600 border-white/20" : "bg-teal-600 border-white"}`}
            >
              <ShieldCheck size={18} className="text-white" />
            </div>
          </div>

          {/* User Details */}
          <div className="text-center mt-6">
            <div className="flex items-center justify-center gap-2">
              <h2
                className={`text-3xl font-black tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}
              >
                {user?.displayName || "Anonymous User"}
              </h2>
            </div>

            <p
              className={`flex items-center justify-center gap-2 mt-2 font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}
            >
              <Mail size={16} /> {user?.email}
            </p>

            <span
              className={`inline-block mt-4 px-6 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${isDark ? "bg-pink-500/10 text-pink-500 border border-pink-500/20" : "bg-teal-100 text-teal-700"}`}
            >
              {role || "Member"} Role
            </span>
          </div>

          {/* --- Action Buttons --- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10 w-full max-w-sm">
            <button
              onClick={() => setOpenUpdate(true)}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-white font-bold transition-all transform hover:scale-105 ${btnStyle}`}
            >
              <Camera size={18} /> Update Profile
            </button>

            <button
              onClick={() => setOpenPassword(true)}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-white font-bold transition-all border transform hover:scale-105 ${isDark ? "border-white/10 hover:bg-white/5" : "border-gray-200 hover:bg-gray-50 text-gray-700"}`}
            >
              <KeyRound size={18} /> Password
            </button>
          </div>
        </div>
      </div>

      {/* --- Update Profile Modal --- */}
      {openUpdate && (
        <Modal title="Edit Profile Details" close={() => setOpenUpdate(false)}>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div className="space-y-2">
              <label
                className={`text-sm font-bold ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                Full Name
              </label>
              <input
                name="name"
                defaultValue={user?.displayName}
                className={`w-full p-4 rounded-xl border outline-none transition-all ${isDark ? "bg-white/5 border-white/10 focus:border-pink-500" : "bg-gray-50 border-gray-200 focus:border-teal-500"}`}
                required
              />
            </div>
            <div className="space-y-2">
              <label
                className={`text-sm font-bold ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                Photo URL
              </label>
              <input
                name="photo"
                defaultValue={user?.photoURL}
                className={`w-full p-4 rounded-xl border outline-none transition-all ${isDark ? "bg-white/5 border-white/10 focus:border-pink-500" : "bg-gray-50 border-gray-200 focus:border-teal-500"}`}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl text-white font-black cursor-pointer uppercase tracking-widest mt-4 ${btnStyle}`}
            >
              {loading ? "Syncing..." : "Update Profile"}
            </button>
          </form>
        </Modal>
      )}

      {/* --- Change Password Modal --- */}
      {openPassword && (
        <Modal title="Secure Account" close={() => setOpenPassword(false)}>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="space-y-2">
              <label
                className={`text-sm font-bold ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                New Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Min. 6 characters"
                className={`w-full p-4 rounded-xl border outline-none transition-all ${isDark ? "bg-white/5 border-white/10 focus:border-pink-500" : "bg-gray-50 border-gray-200 focus:border-teal-500"}`}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl text-white cursor-pointer font-black uppercase tracking-widest mt-4 ${btnStyle}`}
            >
              {loading ? "Updating..." : "Change Password"}
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Profile;
