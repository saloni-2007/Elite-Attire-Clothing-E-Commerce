import { useEffect, useState } from "react";
import api from "../utils/api";
import { Link } from "react-router-dom";
import "./Wishlist.css";
const IMAGE_API = "http://localhost:4000/uploads/";

const getImageUrl = (imageName) => {
  if (!imageName) return "";

  const fileName = imageName.split("/").pop();
  const parts = fileName.split("-");

  if (
    parts.length > 1 &&
    /^\d+$/.test(parts[0]) &&
    /^\d+$/.test(parts[1])
  ) {
    return IMAGE_API + parts.slice(1).join("-");
  }

  return IMAGE_API + fileName;
};

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
const [selectedProduct, setSelectedProduct] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false);


  const getWishlist = async () => {
    try {
      const { data } = await api.get("/wishlist");

      if (data.success) {
        setWishlist(data.wishlist);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeWishlist = async (id) => {
    try {
      const { data } = await api.delete(`/wishlist/${id}`);

      if (data.success) {
        getWishlist();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <>
    <div className="wishlist-container">
      <h2>My Wishlist</h2>

      {wishlist.length === 0 ? (
        <h3>Your wishlist is empty.</h3>
      ) : (
        <div className="wishlist-grid">
          {
         wishlist
          .filter((item) => item.product && item.product.images)
             .map((item) => (
            <div className="wishlist-card" key={item._id}>
             <img
             src={getImageUrl(item.product?.images?.[0])}
             alt={item.product?.title}
              />

              <h3>{item.product.title}</h3>

              <p>₹{item.product.price}</p>

               <button
  onClick={() => {
    setSelectedProduct(item.product);
    setIsModalOpen(true);
  }}
>
  View Product
</button>
                  

             
            

              <button
                className="remove-btn"
                onClick={() => removeWishlist(item._id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>


         {
          isModalOpen && selectedProduct && (
  <div className="productOverlay">
    <div className="productModal">

      <button
        className="closeBtn"
        onClick={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
      >
        ✖
      </button>

      <img
  src={getImageUrl(selectedProduct.images?.[0])}
  alt={selectedProduct.title}
  className="bigImage"
/>

      <h2>{selectedProduct.title}</h2>

      <h3>₹ {selectedProduct.price}</h3>

      <p>{selectedProduct.description}</p>

    </div>
  </div>
)}
</>
  );
}

export default Wishlist;