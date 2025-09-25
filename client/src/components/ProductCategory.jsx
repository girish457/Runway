import "./productCategory.css";

const categories = [
  {
    name: "HandPaint Love",
    img: "https://i.postimg.cc/5284BDFV/generated_image_10.png",
    href: "https://postimg.cc/DSy3Fjgj",
  },
  {
    name: "Everyday Elegance",
    img: "https://i.postimg.cc/mkhZ7D7X/generated-image_(9).png",
    href: "https://postimg.cc/64JNXBjn",
  },
  {
    name: "Royal Aura",
    img: "https://i.postimg.cc/59GbZfBJ/generated_image_6.png",
    href: "https://postimg.cc/G9kWDwgg",
  },
];

export default function ProductCategory() {
  return (
    <div className="category-container">
      {categories.map((category, index) => (
        <div className="category-card" key={index}>
          <a href="/shop/products" style={{display: "block", width: "100%", height: "100%"}}>
            <img src={category.img} alt={category.name} className="category-img" />
            <h3 className="category-title">{category.name}</h3>
          </a>
        </div>
      ))}
    </div>
  );
}


