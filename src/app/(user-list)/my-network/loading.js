import { Skeleton } from "@/components/ui/skeleton";

export default function UserListLoading() {
  return (
    <>
      <div className="mt-4 mb-6 flex h-20 flex-col-reverse items-center justify-center gap-3 min-[900px]:h-15 min-[900px]:flex-row min-[900px]:justify-start">
        <Skeleton className="h-5 w-20 rounded-4xl" />

        <div className="min-[900px]:ml-auto">
          <Skeleton className="w-60 rounded-full py-2 pr-4 pl-10 min-[1180px]:w-64" />
        </div>
      </div>

      <div className="mx-auto grid grid-cols-1 gap-4 min-[900px]:grid-cols-2 min-[1180px]:grid-cols-3 min-[1500px]:grid-cols-4">
        {Array(8)
          .fill(true)
          .map((_, index) => {
            return (
              <Skeleton
                key={index}
                className="h-lg w-3xs min-[800px]:w-64 min-[1280px]:w-67 min-[1545px]:w-2xs"
              />
            );
          })}
      </div>
      <div className="mt-5 flex flex-row items-center justify-center">
        <Skeleton className="h-10 w-50 rounded-4xl" />
      </div>
    </>
  );
}
