import { Button } from "@/components/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
} from "@/store/shop/products-slice";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ProductCategory from "@/components/ProductCategory";
import "./watchBuy.css";
import { getFeatureImages } from "@/store/common-slice";

// Trending circular category cards (6 items) with external links and images
const trendingCategories = [
  {
    id: "royal-aura",
    label: "Royal aura",
    link: "https://postimg.cc/gLP17NjK",
    image: "https://i.postimg.cc/dtbQTJ36/generated_image_011.png",
  },
  {
    id: "everyday-elegance",
    label: "Everyday elegance",
    link: "https://postimg.cc/bGrP0CSD",
    image: "https://i.postimg.cc/cJMJSPsm/generated_images_016.png",
  },
  {
    id: "handpaint-love",
    label: "Handpaint love",
    link: "https://postimg.cc/2VyShwvb",
    image: "https://i.postimg.cc/bNHSXVwT/generated-image_(3).png",
  },
  {
    id: "urban-vibes",
    label: "Urban vibes",
    link: "https://postimg.cc/2VGgHdD4",
    image: "https://i.postimg.cc/NjvYjbCP/generated_image_4.png",
  },
  {
    id: "classic-touch",
    label: "Classic touch",
    link: "https://postimg.cc/mPXfrYpb",
    image: "https://i.postimg.cc/YSkpb81m/generated_image_012.png",
  },
  {
    id: "festive-glam",
    label: "Festive glam",
    link: "https://postimg.cc/TKPFBydB",
    image: "https://i.postimg.cc/dVRFkdzQ/generated_image_3.png",
  },
];

// Define the two slides as requested
const slides = [
  {
    id: 1,
    type: "image",
    content: `<a href='/shop/products' style='display:block;width:100%;height:100%;'>
  <img src='https://i.postimg.cc/5yBkbKkz/Banner-2.jpg' border='0' alt='Banner-2' style='width:100%;height:100%;object-fit:cover;'/>
</a>`,
  },
  {
    id: 2,
    type: "video",
    content: `<div style="width:100%;height:0;padding-top:56.25%;position:relative;">
  <iframe 
    src="https://player.vimeo.com/video/1121776945?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;autoplay=1&amp;muted=1&amp;loop=1&amp;controls=0&amp;playsinline=1&amp;disablekb=1" 
    frameborder="0" 
    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
    referrerpolicy="strict-origin-when-cross-origin" 
    style="position:absolute;top:0;left:0;width:100%;height:100%;" 
    title="banner 1 vdo">
  </iframe>
</div>`,
  },
  {
    id: 3,
    type: "image",
    content: `<a href='/shop/products' style='display:block;width:100%;height:100%;'>
  <img src='https://i.postimg.cc/TwW4H3VC/Banner-3.jpg' border='0' alt='Banner-3' style='width:100%;height:100%;object-fit:cover;'/>
</a>`,
  },
  {
    id: 4,
    type: "image",
    content: `<a href='/shop/products' style='display:block;width:100%;height:100%;'>
  <img src='https://i.postimg.cc/D0kMV35F/Banner-4.jpg' border='0' alt='Banner-4' style='width:100%;height:100%;object-fit:cover;'/>
</a>`,
  },
  {
    id: 5,
    type: "image",
    content: `<a href='/shop/products' style='display:block;width:100%;height:100%;'>
  <img src='https://i.postimg.cc/J7ZFNt4h/Banner-5.jpg' border='0' alt='Banner-5' style='width:100%;height:100%;object-fit:cover;'/>
</a>`,
  },
];

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productDetails } = useSelector(
    (state) => state.shopProducts
  );

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const dispatch = useDispatch();

  const videos = [
    {
      id: 1,
      src:
        "https://player.vimeo.com/video/1120564696?badge=0&autopause=0&loop=1&autoplay=1&muted=1&background=1&player_id=0&app_id=58479",
      name: "Elegant Kurti",
      price: "₹1,499",
      rating: 4.5,
    },
    {
      id: 2,
      src:
        "https://player.vimeo.com/video/1120564287?badge=0&autopause=0&loop=1&autoplay=1&muted=1&background=1&player_id=0&app_id=58479",
      name: "Stylish Saree",
      price: "₹2,999",
      rating: 5,
    },
    {
      id: 3,
      src:
        "https://player.vimeo.com/video/1120564518?badge=0&autopause=0&loop=1&autoplay=1&muted=1&background=1&player_id=0&app_id=58479",
      name: "Trendy Dress",
      price: "₹1,999",
      rating: 4,
    },
  ];

  // Images for new TRENDING PRODUCTS section (8 frames)
  const trendingImagesNew = [
    { href: "https://postimg.cc/CZHt9jyC", src: "https://i.postimg.cc/Zq1SBcVQ/AVP03066.jpg", alt: "AVP03066" },
    { href: "https://postimg.cc/sMts3P0t", src: "https://i.postimg.cc/hGGjbp8P/AVP03031.jpg", alt: "AVP03031" },
    { href: "https://postimg.cc/7bb7Rw0b", src: "https://i.postimg.cc/Y2z3hSSN/AVP02960.jpg", alt: "AVP02960" },
    { href: "https://postimg.cc/D4mqdKdJ", src: "https://i.postimg.cc/4yQBGfY5/AVP02950.jpg", alt: "AVP02950" },
    { href: "https://postimg.cc/62KKvWKc", src: "https://i.postimg.cc/mDzgKk6v/AVP03035.jpg", alt: "AVP03035" },
    { href: "https://postimg.cc/WdKWKXfJ", src: "https://i.postimg.cc/SKQBnP6V/AVP03208.jpg", alt: "AVP03208" },
    { href: "https://postimg.cc/zLV7FKzX", src: "https://i.postimg.cc/8CbYDmxW/AVP03181.jpg", alt: "AVP03181" },
    { href: "https://postimg.cc/SY2p0Jfy", src: "https://i.postimg.cc/wMFxmNts/AVP03138.jpg", alt: "AVP03138" },
  ];

  // Product data for Trending Products section
  const productData = [
    { name: "A LINE KURTI SET", originalPrice: "2499", updatedPrice: "1999" },
    { name: "PINK KURTI SET", originalPrice: "2199", updatedPrice: "1799" },
    { name: "KURTI PLAZZO SET", originalPrice: "2099", updatedPrice: "1699" },
    { name: "AQUA BLUE HANDPAINT KURTI", originalPrice: "2599", updatedPrice: "2099" },
    { name: "PINK KURTI SET", originalPrice: "2199", updatedPrice: "1799" },
    { name: "AQUA BLUE HANDPAINT KURTI", originalPrice: "2599", updatedPrice: "2099" },
    { name: "WINE MIDI DRESS", originalPrice: "1799", updatedPrice: "1499" },
    { name: "PURPLE HANDPAINT KURTI SET", originalPrice: "2699", updatedPrice: "2199" },
  ];

  // Helper functions for product data
  const getProductName = (index) => productData[index].name;
  const getOriginalPrice = (index) => productData[index].originalPrice;
  const getUpdatedPrice = (index) => productData[index].updatedPrice;

  const watchBuyRef = useRef(null);

  useEffect(() => {
    const container = watchBuyRef.current;
    if (!container) return;

    const onWheel = (e) => {
      const smallScreen = window.matchMedia("(max-width: 1024px)").matches;
      if (!smallScreen) return;
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        container.scrollLeft += e.deltaY;
        e.preventDefault();
      }
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
  }, []);

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  // Set up automatic slide transition every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  // Function to render slide content safely
  const renderSlideContent = (content) => {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Updated slider with only 2 slides - fixed height and responsive design */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`${
              index === currentSlide ? "opacity-100" : "opacity-0"
            } absolute top-0 left-0 w-full h-full transition-opacity duration-1000`}
          >
            {renderSlideContent(slide.content)}
          </div>
        ))}
        
        {/* Navigation buttons */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
          }}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
          }}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
        
        {/* Slide indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* PRODUCT CATEGORY - should be first */}
      <section className="py-2 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">PRODUCT CATEGORY</h2>
          <ProductCategory />
        </div>
      </section>

      {/* NEW ARRIVAL - renamed from Trending Products */}
      <section className="py-4 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">NEW ARRIVAL</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 md:gap-6 px-2 sm:px-4 max-w-6xl mx-auto">
            {trendingCategories.map((cat, index) => (
              <a
                key={cat.id}
                href="/shop/products"
                className="group flex flex-col items-center text-center focus:outline-none"
              >
                <div
                  className="rounded-full overflow-hidden border-4 shadow-lg transform transition duration-300 group-hover:scale-105"
                  style={{
                    width: "clamp(60px, 12vw, 180px)",
                    height: "clamp(60px, 12vw, 180px)",
                    borderColor: "#FBBF24",
                  }}
                >
                  <img
                    src={cat.image}
                    alt={cat.label}
                    className="block w-full h-full object-cover"
                    style={{ objectPosition: index === 0 ? "center 30%" : "center" }}
                  />
                </div>
                <span className="mt-2 text-xs sm:text-sm md:text-base font-medium text-gray-800">
                  {cat.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="watchbuy-section">
        <h2 className="section-title">WATCH & BUY</h2>
        <div className="watchbuy-container" ref={watchBuyRef}>
          {videos.map((item) => (
            <div className="watchbuy-card" key={item.id}>
              <a href="/shop/products" style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1}}></a>
              <div className="video-wrapper">
                <iframe
                  src={item.src}
                  title={item.name}
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="video-iframe"
                />
              </div>
              <h3 className="product-name">{item.name}</h3>
              <p className="product-price">{item.price}</p>
              <p className="product-rating">{"⭐".repeat(Math.floor(item.rating))}</p>
              <div className="button-row">
                <button className="btn-cart">Add to Cart</button>
                <button className="btn-wishlist">Add to Wishlist</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TRENDING PRODUCTS - new section below Watch & Buy */}
      <section className="py-4 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">TRENDING PRODUCTS</h2>

          {/* Desktop/Tablet: 4 x 2 grid (matches site card sizing) */}
          <div className="hidden md:grid grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
            {trendingImagesNew.map((img, idx) => (
              <div
                key={`grid-${idx}`}
                className="rounded-xl shadow-md bg-white overflow-hidden border border-gray-100 flex flex-col"
              >
                <a href="/shop/products" className="block w-full">
                  <div className="w-full aspect-[4/5] bg-gray-100 overflow-hidden">
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                  </div>
                </a>
                <div className="p-3 flex flex-col gap-1">
                  <h3 className="text-base font-semibold text-gray-900">{getProductName(idx)}</h3>
                  <p className="text-gray-500 line-through text-sm">₹{getOriginalPrice(idx)}</p>
                  <p className="text-rose-600 font-medium">₹{getUpdatedPrice(idx)}</p>
                  <p className="text-yellow-500 text-sm">⭐⭐⭐⭐☆</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: two horizontal rows with snap */}
          <div className="md:hidden space-y-4">
            {[0, 1].map((row) => (
              <div
                key={`row-${row}`}
                className="flex overflow-x-auto snap-x snap-mandatory gap-3 px-3 -mx-3"
                style={{ scrollPaddingLeft: 12, scrollPaddingRight: 12, scrollBehavior: "smooth" }}
              >
                {trendingImagesNew.slice(row * 4, row * 4 + 4).map((img, col) => (
                    <div
                      key={`m-${row}-${col}`}
                      className="snap-center flex-none w-[76vw] max-w-[300px] rounded-xl shadow-md bg-white overflow-hidden border border-gray-100"
                    >
                      <a href="/shop/products" className="block w-full">
                        <div className="w-full aspect-[4/5] bg-gray-100 overflow-hidden">
                          <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                        </div>
                      </a>
                      <div className="p-3 flex flex-col gap-1">
                        <h3 className="text-base font-semibold text-gray-900">{getProductName(row * 4 + col)}</h3>
                        <p className="text-gray-500 line-through text-sm">₹{getOriginalPrice(row * 4 + col)}</p>
                        <p className="text-rose-600 font-medium">₹{getUpdatedPrice(row * 4 + col)}</p>
                        <p className="text-yellow-500 text-sm">⭐⭐⭐⭐☆</p>
                      </div>
                    </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;