import React from "react";


function App() {

  const productData = [
    {id: 1, name: "Laptop", price: 40299, image: "laptop.jpg"},
    {id: 2, name: "Smartphone", price: 9999, image: "phone.jpg"},
    {id: 3, name: "Tablet", price: 28390, image: "tablet.jpg"},
    {id: 4, name: "Smartwatch", price: 4000, image: "smartwatch.jpg"},  
    {id: 5, name: "Headphones", price: 5999, image: "headphones.jpg"},
  ]

  
  const Carousel = React.forwardRef(({ items }, ref) => {
    const containerRef = React.useRef(null);
    const [activeIndex, setActiveIndex] = React.useState(0);

    const scrollTo = (index) => {
      const container = containerRef.current;
      const cardWidth = container.firstChild.offsetWidth + 16; 
      container.scrollTo({ left: index * cardWidth, behavior: "smooth" });
      setActiveIndex(index);
    };

    React.useImperativeHandle(ref, () => ({
      nextSlide() {
        if (activeIndex < items.length - 1) scrollTo(activeIndex + 1);
      },
      prevSlide() {
        if (activeIndex > 0) scrollTo(activeIndex - 1);
      },
    }));


    return (
      <div
        ref={containerRef}
        style={{
          display: "flex",
          overflowX: "auto",
          scrollBehavior: "smooth",
          gap: "16px",
          padding: "10px",
        }}
      >
        {items.map((product) => (
          <div
            key={product.id}
            style={{
              flex: "0 0 auto",
              width: "200px",
              textAlign: "center",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
            <h3>{product.name}</h3>
            <p>Price: Rs {product.price}</p>
          </div>
        ))}
      </div>
    );
  });

  return(
    <div>
    <h1>Product Corousel</h1>

    <div style={{display: "flex", overflowX: "auto", padding: "10px", textAlign: "center", gap: "16px" }}>
      <button>Previous</button>
      <button>Next</button>
    </div>
    
    {productData.map((product) => (
      <div key={product.id} style={{ margin: "10px", display: "inline-block" }}>
        <img src={product.image} alt={product.name} style={{ width: "350px", height: "350px" }} />
        <h2>{product.name}</h2>
        <p>Price: Rs {product.price}</p> 
      </div>
    ))}
    </div>
  )
}

export default App;