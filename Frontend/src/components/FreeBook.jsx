import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import Card from "./Card";

function Freebook() {
  const [book, setBook] = useState([]);

  useEffect(() => {
    const getBook = async () => {
      try {
const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/book`);

        // Filter only books with category "free"
        const data = res.data.filter(
          (item) => item.category && item.category.toLowerCase() === "free"
        );

        setBook(data);
      } catch (err) {
        console.log(err);
      }
    };

    getBook();
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
      <div>
        <h1 className="font-semibold text-xl pb-2">Free Offered Courses</h1>
        <p>
          Browse through free courses and resources to start learning without
          spending a penny!
        </p>
      </div>

      <Slider {...settings}>
        {book.map((item) => (
          <Card item={item} key={item._id} />
        ))}
      </Slider>
    </div>
  );
}

export default Freebook;
