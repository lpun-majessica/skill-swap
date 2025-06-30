export default function UserPageLayout({ children }) {
  return (
    <div className="mt-5 mb-8 flex flex-col justify-center gap-10 lg:mt-12 lg:flex-row xl:mt-14 xl:mb-10">
      {children}
    </div>
  );
}
