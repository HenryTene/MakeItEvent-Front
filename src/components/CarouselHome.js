import React, { useEffect, useState } from "react";

import Banner from "./Banner";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";

export default function CarouselHome() {
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [queryParams] = useState({
    published: 1,
  });

  useEffect(() => {
    let params = Object.entries(queryParams).filter(([k, v]) => v !== "");

    const fetchData = async () => {
      if (params.length) {
        const queryString = params
          .map((arr) => `${arr[0]}=${arr[1]}`)
          .reduce((k, v) => {
            if (k !== "") {
              let result = `${k}&${v}`;
              return result;
            } else {
              return `${v}`;
            }
          }, "");
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_API_URL}/api/v1/posts?${queryString}`
          );
          setFilteredPosts(response.data.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchData();
  }, [queryParams]);

  return (
    <>
      <div className="mb-3 mt-5">
        <h3>Estos son los eventos mas buscados</h3>
      </div>

      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlay
        autoPlaySpeed={5000}
        centerMode={false}
        className=""
        containerClass="container-with-dots"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 3,
            partialVisibilityGutter: 40,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0,
            },
            items: 1,
            partialVisibilityGutter: 30,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 2,
            partialVisibilityGutter: 30,
          },
        }}
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        {filteredPosts.map(
          ({ id, company, photos, ubication, category, rate }) => {
            return (
              <Banner
                key={id}
                id={id}
                company={company}
                photos={photos[0]}
                ubication={ubication}
                category={category}
                rate={rate}
              />
            );
          }
        )}
      </Carousel>
    </>
  );
}
