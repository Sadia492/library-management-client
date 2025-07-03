import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

interface Slide {
  id: number;
  image: string;
  title: string;
  title2: string;
  description: string;
  titleAnimation: string;
}

export default function Banner() {
  //   const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    cssEase: "ease-in-out",
    // afterChange: (index: number) => setCurrentSlide(index),
  };

  const slides: Slide[] = [
    {
      id: 1,
      image: "https://i.ibb.co/4TS10sH/school-work-851328-1280.jpg",
      title: "Your Digital Library Assistant",
      title2: "Manage Books Effortlessly, Borrow Seamlessly",
      description:
        "A lightweight system to track, add, edit, and borrow books—all in one clean, responsive dashboard.",
      titleAnimation: "animate__fadeInLeft",
    },
    {
      id: 2,
      image: "https://i.ibb.co/FwtBzw5/Planning-to-study-abroad.jpg",
      title: "Organize Your Books Like a Pro",
      title2: "Fast, Reliable Book Tracking System",
      description:
        "Create, update, and delete books in real time. Monitor availability, copies, and ISBNs with a clear, sortable interface.",
      titleAnimation: "animate__fadeInUp",
    },
    {
      id: 3,
      image:
        "https://i.ibb.co/fzrD3TWs/360-F-1135617872-ELKv-QMGCfif-S2-IQta-Mt-Rdx-HIx-E0-PVf8-X.jpg",
      title: "Borrowing Made Simple",
      title2: "Track Borrowed Books in One Click",
      description:
        "Borrow books by quantity, set due dates, and automatically update availability—backed by a real-time borrow summary dashboard.",
      titleAnimation: "animate__zoomIn",
    },
  ];

  return (
    <div className="w-full mb-5">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="relative max-h-[calc(100vh-100px)]">
            <div className="relative w-full">
              {/* Background Overlay */}
              <div className="absolute inset-0 bg-black opacity-20 z-10"></div>

              {/* Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-screen object-cover object-bottom z-0"
              />
            </div>

            {/* Text Overlay */}
            <div className="absolute top-0 left-0 z-30 flex flex-col justify-center items-center text-center h-[calc(100vh-100px)] w-full px-6 text-white space-y-4">
              <h1 className={`text-4xl md:text-5xl font-bold text-white`}>
                {slide.title}
              </h1>
              <h2 className={`text-3xl md:text-5xl font-bold text-white`}>
                {slide.title2}
              </h2>
              <p className="lg:w-2/3 text-white text-base md:text-lg font-normal">
                {slide.description}
              </p>
              <a
                href="/create-book"
                className="btn bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 rounded-full shadow-md hover:opacity-90 transition"
              >
                Add Book Now
              </a>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
