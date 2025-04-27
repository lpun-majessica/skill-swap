import Image from 'next/image';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB"); 
};

const UserDetails = ({ user, isEditable = true }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center w-lg h-fit">
      <Image src={`/pfp/${user.id}.jpeg`} alt="Avatar" width={160} height={160} className="rounded-full" />
      <h2 className="text-xl font-bold mt-4">{user.fullname}</h2>
      <h4 className="text-ss-red-444 text-base mt-2">{user.job}</h4>
      {!isEditable && (
        <button className="font-semibold text-ss-light-FFF mt-4 px-6 py-2 bg-ss-red-404 rounded-full hover:bg-ss-light-777 hover:text-ss-black-717">
          Connect
        </button>
      )}
      <div className=" border border-gray-300 rounded-2xl p-6 flex flex-col items-center my-4 w-90">
        <div className="flex flex-col gap-4 w-full">
          {/* Username */}
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-1">User name</p>
            <div className="bg-gray-100 rounded-xl px-4 py-2">
              <span className="text-gray-500 text-sm">@{user.username}</span>
            </div>
          </div>

          {/* Date of Birth */}
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-1">Date of Birth</p>
            <div className="bg-gray-100 rounded-xl px-4 py-2 ">
              <span className="text-gray-500 text-sm">{formatDate(user.dob)}</span>
            </div>
          </div>

          {/* Bio */}
          <div>
          <p className="font-medium text-gray-700 ">Bio:</p>
          <div className="bg-gray-100 rounded-xl px-4 py-2 h-20">
              <span className="text-gray-500 text-sm">{user.bio}</span>
            </div>
          </div>
            
        </div>

      </div>

      {isEditable && (
        <button className="mt-2 px-4 py-2 bg-gray-300 rounded hover:bg-ss-red-404 hover:text-ss-light-FFF">
          Edit profile
        </button>
      )}
    </div>
  );
};

export default UserDetails;
