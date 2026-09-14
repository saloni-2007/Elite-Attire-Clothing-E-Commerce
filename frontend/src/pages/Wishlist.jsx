import { useEffect, useState } from "react";
import api from "../utils/api";
import { FaHeart } from "react-icons/fa";
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

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <div className="wishlist-container">
        <h2>My Wishlist</h2>

        {wishlist.length === 0 ? (
          <h3>Your wishlist is empty.</h3>
        ) : (
          <div className="wishlist-grid">
            {wishlist
              .filter(
                (item) =>
                  item.product &&
                  item.product.images &&
                  item.product.images.length > 0
              )
              .map((item) => (
                <div className="wishlist-card" key={item._id}>
                  {/* Product Image */}
                  <div className="image-wrapper">
                    <img
                      src={getImageUrl(item.product.images[0])}
                      alt={item.product.title}
                    />

                    {/* Small Wishlist Heart */}
                    <button
                      className="wishlist-heart"
                      onClick={() => removeWishlist(item._id)}
                      title="Remove from Wishlist"
                    >
                      <FaHeart />
                    </button>
                  </div>

                  {/* Product Details */}
                  <h3>{item.product.title}</h3>

                  <p>₹{item.product.price}</p>

                  {/* View Product Button */}
                  <button
                    className="view-product-btn"
                    onClick={() => {
                      setSelectedProduct(item.product);
                      setIsModalOpen(true);
                    }}
                  >
                    View Product
                  </button>

                  {/* Remove Button */}
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

      {/* Product Modal */}
      {isModalOpen && selectedProduct && (
        <div className="productOverlay">
          <div className="productModal">
            <button className="closeBtn" onClick={closeModal}>
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