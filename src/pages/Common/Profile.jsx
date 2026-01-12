import { useState } from "react";
import coverImg from "../../assets/AuthImage.jpg";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import { updateProfile, updatePassword } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import Modal from "../Common/Modal";

const Profile = () => {
  const { user } = useAuth();
  const [role] = useRole();

  const [openUpdate, setOpenUpdate] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const [loading, setLoading] = useState(false);

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
      alert("Profile updated successfully");
      setOpenUpdate(false);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const password = e.target.password.value;

    if (password.length < 6) {
      return alert("Password must be at least 6 characters");
    }

    try {
      setLoading(true);
      await updatePassword(auth.currentUser, password);
      alert("Password updated successfully");
      setOpenPassword(false);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl md:w-4/5 lg:w-3/5">
        <img
          src={coverImg}
          alt="cover"
          className="w-full h-56 object-cover rounded-t-2xl"
        />

        <div className="flex flex-col items-center p-6 -mt-16">
          <img
            src={user?.photoURL}
            alt="profile"
            className="w-24 h-24 rounded-full border-4 border-white object-cover"
          />

          <span className="mt-2 px-4 py-1 text-xs text-white bg-lime-500 rounded-full">
            {role}
          </span>

          <h2 className="mt-2 text-xl font-semibold text-gray-800 dark:text-white">
            {user?.displayName}
          </h2>
          <p className="text-sm text-gray-500">{user?.email}</p>

          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={() => setOpenUpdate(true)}
              className="bg-lime-500 px-6 py-2 rounded-lg text-white hover:bg-lime-700"
            >
              Update Profile
            </button>

            <button
              type="button"
              onClick={() => setOpenPassword(true)}
              className="bg-lime-500 px-6 py-2 rounded-lg text-white hover:bg-lime-700"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Update Profile Modal */}
      {openUpdate && (
        <Modal title="Update Profile" close={() => setOpenUpdate(false)}>
          <form onSubmit={handleUpdateProfile} className="space-y-3">
            <input
              name="name"
              defaultValue={user?.displayName}
              placeholder="Full Name"
              className="input"
              required
            />
            <input
              name="photo"
              defaultValue={user?.photoURL}
              placeholder="Photo URL"
              className="input"
              required
            />
            <button type="submit" className="btn-primary w-full">
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </form>
        </Modal>
      )}

      {openPassword && (
        <Modal title="Change Password" close={() => setOpenPassword(false)}>
          <form onSubmit={handleChangePassword} className="space-y-3">
            <input
              type="password"
              name="password"
              placeholder="New Password"
              className="input"
              required
            />
            <button type="submit" className="btn-primary w-full">
              {loading ? "Updating..." : "Change Password"}
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Profile;
