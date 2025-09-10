export default function ProfilePage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow p-8 flex flex-col items-center">
        <img
          src="https://i.pravatar.cc/150"
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md"
        />
        <h2 className="mt-4 text-3xl font-bold text-gray-800">John Doe</h2>
      </div>

      {/* Profile Details */}
      <div className="mt-8 bg-white rounded-2xl shadow p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          <div>
            <p className="text-sm font-medium text-gray-500">Phone</p>
            <p className="text-lg font-semibold">+91 9876543210</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Gender</p>
            <p className="text-lg font-semibold">Male</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Age</p>
            <p className="text-lg font-semibold">29</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Blood Group</p>
            <p className="text-lg font-semibold">B+</p>
          </div>
        </div>
      </div>
    </div>
  );
}
