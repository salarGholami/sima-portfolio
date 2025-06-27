import CardsSection from "./cart/CardsSection";

const ContentSection = () => {
  return (
    <div className="w-full h-screen">
      <div className="grid grid-cols-12 h-full md:mx-4 lg:mx-10 xl:mx-20">
        {/* سمت چپ - عنوان عمودی */}
        <div className="col-span-12 md:col-span-1 flex items-start md:items-center justify-center p-4">
          <div className="md:-rotate-90 flex flex-col items-center">
            <h1 className="text-xl sm:text-4xl md:text-2xl lg:text-3xl font-extrabold text-gray-800 uppercase tracking-wide">
              Contents
            </h1>
            <div className="border-b-2 border-yellow-500 w-14 mt-1" />
          </div>
        </div>

        {/* مرکز - بخش کارت‌ها */}
        <div className="col-span-12 md:col-span-10 overflow-hidden md:overflow-y-auto ">
          <CardsSection />
        </div>

        {/* ستون خالی سمت راست */}
        <div className="hidden md:block md:col-span-1" />
      </div>
    </div>
  );
};

export default ContentSection;
