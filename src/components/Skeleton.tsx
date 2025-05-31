function Skeleton() {
  return (
    <main className="flex flex-col gap-6">
      {Array.from({ length: 2 }).map((_, index) => (
        <div key={index} className="w-full">
          <div className="flex gap-4 items-center p-2">
            <div className="h-8 w-8 rounded-full bg-color-animation"></div>
            <div className="h-2 w-32 rounded-full bg-color-animation"></div>
          </div>
          <div className="w-full h-[390px] bg-color-animation"></div>
          <div className="flex flex-col pl-4 py-6 gap-2">
            <div className="h-2 w-40 rounded-full bg-color-animation"></div>
            <div className="h-2 w-36 rounded-full bg-color-animation"></div>
          </div>
        </div>
      ))}
    </main>
  );
}

export default Skeleton;
