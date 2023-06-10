import Banner from "../Banner/Banner";
import PopularClasses from "../PopularClasses/PopularClasses";
import PopularInstructors from "../PopularInstructors/PopularInstructors";
import SectionOne from "../SectionOne/SectionOne";
import SectionTwo from "../SectionTwo/SectionTwo";

const Home = () => {
  return (
    <div className="">
      <Banner />
      <SectionOne />
      <PopularClasses />
      <SectionTwo />
      <PopularInstructors />
    </div>
  );
};

export default Home;
