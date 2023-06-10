// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import slide1 from "./../../../assets/banner/slider1.png";
import slide2 from "./../../../assets/banner/slider2.png";
import slide3 from "./../../../assets/banner/slider3.png";
import icon1 from "./../../../assets/icons/icon1.png";
import icon2 from "./../../../assets/icons/icon2.png";
import icon3 from "./../../../assets/icons/icon3.png";
import icon4 from "./../../../assets/icons/icon4.png";
import icon5 from "./../../../assets/icons/icon5.png";
import icon6 from "./../../../assets/icons/icon6.png";

const Banner = () => {
  const [sliderRef] = useKeenSlider(
    {
      loop: true,
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 2000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  return (
    <>
      <div ref={sliderRef} className="keen-slider bg-[#bae7ff]">
        <div className="keen-slider__slide number-slide1">
          <div className="relative">
            <img src={slide1} alt="" />
            <div className="absolute top-4 right-96">
              <img src={icon1} alt="" />
            </div>
            <div className="absolute top-56 right-24">
              <img src={icon2} alt="" />
            </div>
            <div className="absolute top-32 right-24">
              <h1 className="text-violet-700 text-5xl font-bold">
                Practical teaching &
              </h1>
              <h2 className="text-orange-600 pt-5 text-5xl font-bold">
                Social Development
              </h2>
              <p className="my-8 text-lg font-semibold">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aliquam, et!
              </p>
              <button className="btn bg-emerald-400 px-6 py-2 rounded-3xl font-semibold text-base text-white hover:bg-rose-600">
                lorem more
              </button>
            </div>
          </div>
        </div>
        <div className="keen-slider__slide number-slide2">
          <img src={slide2} alt="" />
          <div className="absolute top-4 right-96">
            <img src={icon1} alt="" />
          </div>
          <div className="absolute top-56 right-24">
            <img src={icon3} alt="" />
          </div>
          <div className="absolute top-32 right-52">
            <h4 className="text-2xl font-bold text-purple-800 ">
              Fun In School
            </h4>
            <h1 className="text-6xl my-6 font-bold text-fuchsia-600">
              Creative Learning
            </h1>
            <div className="text-black">
              <p>Creative Lesson plans</p>
              <p>1000+ workshets & craft sheets</p>
              <p>Weekly Acadamic traning for kids</p>
              <p>Universal Workshop for childrens</p>
            </div>
            <button className="btn mt-9 bg-emerald-400 px-6 py-2 rounded-3xl font-semibold text-base text-white hover:bg-rose-600">
              lean more
            </button>
          </div>
        </div>
        <div className="keen-slider__slide number-slide3">
          <div className="relative">
            <img src={slide3} alt="" />
            <div className="absolute">
              <img src={icon3} alt="" />
            </div>
            <div className="absolute top-48 left-14">
              <h1 className="text-5xl font-bold text-sky-400">
                Empowering students{" "}
                <span className="text-black ">
                  from
                  <br />
                  small age
                </span>{" "}
                <span className="text-orange-500">towards vision.</span>
              </h1>
              <p className="text-xl my-6 font-bold">
                With the courage, Cofidence creativity and Compassion to make
                their Unique
                <br />
                Contribution in a Diverse and Dynamic World.
              </p>
              <button className="btn  bg-emerald-400 px-6 py-2 rounded-3xl font-semibold text-base text-white hover:bg-rose-600">
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
