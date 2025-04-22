import Image from "next/image";

export default async function ProfilePage({ params }) {
  const { id } = await params;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold">Profile Page</h1>
      <p>User ID: {id}</p>
      <Image
        src={`/pfp/${id}.jpeg`}
        width={200}
        height={200}
        alt="User profile picture"
      />
    </div>
  );
}
