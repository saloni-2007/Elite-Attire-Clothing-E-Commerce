import { useEffect, useState } from "react";
import api from "../utils/api";
import productCSS from "./Products.module.css";
import { FaRegHeart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useLocation } from "react-router-dom";


function Product() {
  const [productData, setProductData] = useState([]);
  const [pagination, setPagination] = useState({});
  const[page,setPage]=useState(1);
  const { getCartCount } = useCart();
  const location = useLocation();
  const[categories,setCategories]=useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [maxPrice, setMaxPrice] = useState(5000);
 const [sort, setSort] = useState("");

const searchText= new URLSearchParams(location.search).get("search") || "";
  const IMAGE_API = "http://localhost:4000/uploads/";

  async function getData() {
    try {
       const response = await api.get(
        `/products/all?page=${page}&limit=8&search=${searchText}&size=${selectedSize}&category=${selectedCategory}&maxPrice=${maxPrice}&sort=${sort}`
         );

       const res = response.data;
      if (res?.success) {
        console.log(res);
        setProductData(res?.data);
        setPagination(res?.pagination);
      }
    } catch (err) {
      alert("Error In Fetching Data!!");
      console.log(err);
    }
    console.log({
  page,
  searchText,
  selectedCategory,
  selectedSize,
  maxPrice,
  sort,
});
  }

  async function addToCart(productId) {
  try {
    const response = await api.post("/cart/add", {
      productId,
    });

    const res = response.data;
if (res.success) {

    getCartCount();   

    alert("Product Added To Cart");

}
     else {
      alert(res.message);
    }
  } catch (error) {
    console.log(error);
    alert("Unable To Add Product");
  }
}
async function getCategories() {
  try {
    const response = await api.get("/category");
    const res = response.data;

    if (res.success) {
      setCategories(res.data);
    }
  } catch (error) {
    console.log(error);
  }
}



const addToWishlist = async (productId) => {
  try {
    const { data } = await api.post("/wishlist/add", {
      product: productId,
    });

    alert(data.message);

  } catch (error) {
    alert(error.response?.data?.message || "Something went wrong");
  }
};


  useEffect(() => {
  getData();
}, [
  page,
  searchText,
  sort,
  selectedCategory,
  selectedSize,
  maxPrice,
]);

useEffect(() => {
  getCategories();
}, []);


useEffect(() => {
  setPage(1);
}, [searchText]);


const maxVisiblePages = 4;

let startPage = Math.max(1, page - 1);

let endPage = Math.min(
  pagination.totalPages || 0,
  startPage + maxVisiblePages - 1
);

if (endPage - startPage < maxVisiblePages - 1) {
  startPage = Math.max(1, endPage - maxVisiblePages + 1);
}




  return (
    <main className={productCSS.container}>
      {/* Filter section */}
      <aside className={productCSS["filter-sidebar"]}>
        <h2>Filters</h2>
        <hr className={productCSS.divider} />

        <div className={productCSS["filter-group"]}>
  <h3>Category</h3>

  {categories.map((category) => (
    <div
      className={productCSS["checkbox-group"]}
      key={category._id}
    >
      <input
        type="radio"
        name="category"
        value={category._id}
        checked={selectedCategory===category._id}
        onChange={(e) => setSelectedCategory(e.target.value)}
      />

      <label htmlFor={category._id}>
        {category.name}
      </label>
    </div>
  ))}
</div>

        <div className={productCSS["filter-group"]}>
          <h3>SIZE</h3>
          <div className={productCSS["size-grid"]}>



            <button
type="button"
onClick={() => setSelectedSize("XS")}
className={
selectedSize==="XS"
?`${productCSS["size-btn"]} ${productCSS["active"]}`
:productCSS["size-btn"]
}
>
XS
</button>



            <button
type="button"
onClick={() => setSelectedSize("S")}
className={
selectedSize==="S"
?`${productCSS["size-btn"]} ${productCSS["active"]}`
:productCSS["size-btn"]
}
>
S
</button>



            <button
type="button"
onClick={() => setSelectedSize("M")}
className={
selectedSize==="M"
?`${productCSS["size-btn"]} ${productCSS["active"]}`
:productCSS["size-btn"]
}
>
M
</button>



            <button
type="button"
onClick={() => setSelectedSize("L")}
className={
selectedSize==="L"
?`${productCSS["size-btn"]} ${productCSS["active"]}`
:productCSS["size-btn"]
}
>
L
</button>



            <button
type="button"
onClick={() => setSelectedSize("XL")}
className={
selectedSize==="XL"
?`${productCSS["size-btn"]} ${productCSS["active"]}`
:productCSS["size-btn"]
}
>
XL
</button>



          </div>
        </div>

        <div className={productCSS["filter-group"]}>
          <h3>PRICE RANGE</h3>
          <div className={productCSS["price-slider-wrapper"]}>
            <input
              type="range"
              className={productCSS["price-slider"]}
              min="100"
              max="5000"
              value={maxPrice}
             onChange={(e)=>setMaxPrice(e.target.value)}

            />
            <div className={productCSS["price-labels"]}>
              <span>&#x20B9;100</span>
              <span>&#x20B9;{maxPrice}</span>
            </div>
          </div>
        </div>

        <button  onClick={()=>{
        setPage(1);
            getData();
        }}
        type="button" className={productCSS["apply-btn"]}>
          APPLY FILTERS
        </button>
      </aside>

      {/* Product section */}
      <section className={productCSS["product-container"]}>
        <div className={productCSS["product-header"]}>
          <div className={productCSS["header-title-group"]}>
            <h1>Premium Attires</h1>
            <p className={productCSS["item-count"]}>
              Displaying {productData.length} of {pagination?.total} items in{" "}
              <span>Tailoring</span>
            </p>
          </div>

          <div className={productCSS["sort-dropdown-wrapper"]}>
            <label htmlFor="sort-select">
              <span className={productCSS["sortby-text"]}>SORT BY:</span>
            </label>
           
             <select
           id="sort-select"
                 className={productCSS["sort-select"]}
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                 >
  <option value="">Recommended</option>
  <option value="low-to-high">Price: Low to High</option>
  <option value="high-to-low">Price: High to Low</option>
  <option value="newest">Newest First</option>
</select>


          </div>
        </div>

        <div className={productCSS["product-grid"]}>
          {productData?.map((product) => (
            <div key={product?._id} className={productCSS["product-card"]}>
              <div className={productCSS["image-wrapper"]}>
                <img
                  src={IMAGE_API + product?.images?.[0]}
                  alt={product?.title}
                />

                <button
                  type="button"
                  className={productCSS["favorite-btn"]}
                  aria-label="Add to favorites"
                  onClick={() => addToWishlist(product._id)}
                >
                  <FaRegHeart className={productCSS["heart-icon"]} />
                </button>

                <button
           type="button"
               className={productCSS["quick-add-btn"]}
              onClick={() => {
                addToCart(product._id);
                 }}
                        >
                     Add To Cart
                   </button>
              </div>

             <div className={productCSS["product-info"]}>
  <h2 className={productCSS["product-title"]}>
    {product.title}
  </h2>


<div className={productCSS["product-price-box"]}>
  <span className={productCSS["final-price"]}>
    ₹
    {(
      product.price -
      (product.price * product.discount) / 100
    ).toLocaleString()}
  </span>

  {product.discount > 0 && (
    <>
      <span className={productCSS["old-price"]}>
        ₹{product.price.toLocaleString()}
      </span>

      <span className={productCSS["discount"]}>
        {product.discount}% OFF
      </span>
    </>
  )}
</div>

<p className={productCSS.productRating}>
  ⭐ {product.rating}
</p>


</div>


            </div>
          ))}
        </div>

        {productData.length > 0 && (
          <div className={productCSS["pagination"]}>
  {/* Previous */}
  <button
    type="button"
    className={productCSS["page-arrow"]}
    disabled={!pagination.isPrevPage}
    onClick={() => setPage((prev) => prev - 1)}
  >
    Prev
  </button>

  {/* Page Numbers */}
  {Array.from(
  { length: endPage - startPage + 1 },
  (_, index) => {
    const pageNumber = startPage + index;

    return (
      <button
        key={pageNumber}
        type="button"
        onClick={() => setPage(pageNumber)}
        className={
          page === pageNumber
            ? `${productCSS["page-num"]} ${productCSS["active-page"]}`
            : productCSS["page-num"]
        }
      >
        {pageNumber}
      </button>
    );
  }
)}

  {/* Next */}
  <button
    type="button"
    className={productCSS["page-arrow"]}
    disabled={!pagination.isNextPage}
    onClick={() => setPage((prev) => prev + 1)}
  >
    next
  </button>
</div>



        )}
      </section>
    </main>
  );
}

export default Product;