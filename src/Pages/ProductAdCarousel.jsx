import React, { useEffect, useState } from "react";

const ads = [
  {
    img: "img/watch1.jpg",
    link: "https://chronolite.com.ng/watches",
  },
  {
    img: "img/watch2.jpg",
    link: "https://chronolite.com.ng/watches",
  },
  {
    img: "img/watch3.jpg",
    link: "https://chronolite.com.ng/watches",
  },
];

function ProductAdCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % ads.length);
    }, 4000); // 4 seconds

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <div className="  flex items-center justify-center">
      <div className="h-[300px] w-[300px] flex items-center justify-center relative overflow-hidden">
        <a href={ads[current].link} target="_blank" rel="noopener noreferrer">
          <img
            src={ads[current].img}
            alt={`Ad ${current + 1}`}
            className="w-full h-full object-cover transition duration-700"
          />
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-sm px-6 py-1 rounded">
            shop at chronolite.com.ng
          </div>
        </a>
      </div>
    </div>
  );
}

export default ProductAdCarousel;
