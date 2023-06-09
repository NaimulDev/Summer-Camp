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
      <div ref={sliderRef} className="keen-slider">
        <div className="keen-slider__slide number-slide1">
          <div className="relative">
            <img src={slide1} alt="" />
            <div className="absolute top-4 right-96">
              <img src={icon1} alt="" />
            </div>
            <div className="absolute top-56 right-24">
              <img src={icon2} alt="" />
            </div>
            <div className="absolute top-28 right-5">
              <h1>
                Practical teaching &
                <br />
                Social Development
              </h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aliquam, et!
              </p>
              <button className="btn">lorem more</button>
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
          <div className="absolute top-28 right-80">
            <h4>Fun In School</h4>
            <h1>Creative Learning</h1>
            <p>a</p>
            <p>b</p>
            <p>c</p>
            <p>d</p>
            <button className="btn ">lean more</button>
          </div>
        </div>
        <div className="keen-slider__slide number-slide3">
          <div className="relative">
            <img src={slide3} alt="" />
            <div className="absolute">
              <img src={icon3} alt="" />
            </div>
            <div className="absolute top-48 left-14">
              <h1>
                Empowering students <span>from small age</span> towards vision.
              </h1>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta
                molestias error esse eligendi repudiandae eos.
              </p>
              <button className="btn">Enroll Now</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
