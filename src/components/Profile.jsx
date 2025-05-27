import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../features/users/userSlice";
import { User, Pencil } from "lucide-react";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.users);
  const fileInputRef = useRef(null);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Handle image upload logic here
      console.log(file);
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 bg-[#000000] ">
      {/* Profile Picture Section */}
      {/* <div className="bg-[#121212] shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Edit your profile</h2>
        <div className="relative w-24 h-24 mb-4">
          <img
            src={profile?.avatar || "/images/default.png"}
            alt="profile"
            className="w-24 h-24 rounded-full object-cover border"
          />
          <button
            className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full"
            onClick={() => fileInputRef.current.click()}
          >
            <Pencil size={16} />
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        <p className="text-sm text-gray-500">Only .jpg, .jpeg, .png allowed</p>
        <button className="mt-4 px-4 py-2 bg-primary text-white rounded">
          Save
        </button>
      </div> */}

      {/* Edit User Info */}
      <div className="bg-[#121212] shadow rounded-xl p-6 xl:col-span-2">
        <h2 className="text-xl font-semibold mb-4">Edit User Information</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input
              type="text"
              defaultValue={profile?.firstname || ""}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input
              type="text"
              defaultValue={profile?.lastname || ""}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              House Address
            </label>
            <input
              type="text"
              defaultValue={profile?.address || ""}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Phone Number
            </label>
            <input
              type="text"
              defaultValue={profile?.phone || ""}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={profile?.email || ""}
              readOnly
              className="w-full border p-2 rounded "
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Town/City</label>
            <input
              type="text"
              defaultValue={profile?.city || ""}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Zip code</label>
            <input
              type="text"
              defaultValue={profile?.zip || ""}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Country</label>
            <input
              type="text"
              value={profile?.country || ""}
              readOnly
              className="w-full border p-2 rounded "
            />
          </div>
          <div className="col-span-full">
            <button className="mt-4 px-6 py-2 bg-primary text-white rounded bg-blue-600">
              Save
            </button>
          </div>
        </form>
      </div>

      {/* Account Verification */}
      <div className="bg-[#121212] shadow rounded-xl p-6 xl:col-span-2">
        <h2 className="text-lg font-semibold">Account Verification</h2>
        <p className="text-sm text-gray-500 mb-4">
          Verify your account to access all platform features
        </p>
        <div className="overflow-auto">
          <table className="table-auto w-full text-left border border-gray-700">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-2 border border-gray-700"> </th>
                <th className="p-2 border border-gray-700">Unverified</th>
                <th className="p-2 border border-gray-700">Verified</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-900">
                <td className="p-2 border border-gray-700">
                  Withdrawals limit per day
                </td>
                <td className="p-2 border border-gray-700">
                  20,000 USD (or equal)
                </td>
                <td className="p-2 border border-gray-700">Unlimited</td>
              </tr>
              <tr className="hover:bg-gray-900">
                <td className="p-2 border border-gray-700">KYC Bonus</td>
                <td className="p-2 border border-gray-700">-</td>
                <td className="p-2 border border-gray-700">$10</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-700"></td>
                <td className="p-2 border border-gray-700"></td>
                <td className="p-3 border border-gray-700">
                  <Link
                    to="/kyc"
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Verify
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Usually, KYC verification takes no more than 2 minutes. For more
          information about our KYC and AML Policy please message our support.
        </p>
      </div>

      {/* Edit Security */}
      <div className="bg-[#121212] shadow rounded-xl p-6 xl:col-span-2">
        <h2 className="text-xl font-semibold mb-4">Edit Security</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Current Password
            </label>
            <input type="password" className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              New Password
            </label>
            <input type="password" className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Repeat Password
            </label>
            <input type="password" className="w-full border p-2 rounded" />
          </div>
          <div className="col-span-full">
            <button className=" bg-blue-600 mt-4 px-6 py-2 bg-primary text-white rounded">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
