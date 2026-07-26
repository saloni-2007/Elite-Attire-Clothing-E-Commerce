import style from "./AdminProducts.module.css";
import productCSS from "../Products.module.css";
import { AiFillDelete } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { useState, useEffect } from "react";
import api from "../../utils/api";
function AdminProducts() {
  let product = {
    title: "Demo Products",
    _id: 1,
    images: [
      "https://pitshirts.in/cdn/shop/files/InShot-20241209_144744296.jpg?v=1755319164&width=1946",
    ],
    price: 10000,
  };
  let [productsData ,setProductsData]=useState ([]);
   const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({});
    const [isEditMode, setIsEditMode] = useState(false);
    const [editProductId, setEditProductId] = useState("");

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const IMAGE_API="http://localhost:4000/uploads/";
  const [data, setData] = useState({
    title: "",
    description: "",
    price: 0,
    discount: 0,
    rating:4.5,
    stock: 0,
    category: "",
    subcategory: "",
    size:[],
    keywords:"",
    images: [],
    oldImages:[],
  });

  const [categories, setCategories] = useState([]);

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    for (let key in data) {
  if (key === "images") {
    for (let image of data.images) {
      formData.append("images", image);
    }
  }

  else if (key === "size") {
    data.size.forEach((item) => {
      formData.append("size", item);
    });
  }
  else if (key === "oldImages") {

data.oldImages.forEach((img)=>{
formData.append("oldImages",img);
});

}

  else {
    formData.append(key, data[key]);
  }
}
    for (let pair of formData.entries()) {
  console.log(pair[0], pair[1]);
}

   let response;

if (isEditMode) {
  formData.append("productId", editProductId);

  response = await api.put("/products", formData, {
    headers: undefined,
  });
} else {
  response = await api.post("/products", formData, {
    headers: undefined,
  });
}





    const res = response.data;
   if (res?.success) {
  alert("Product Added Successfully");
  getProductsData();
  setIsMenuOpen(false);
  setIsEditMode(false);
setEditProductId("");
}
  }
  function handleSizeChange(e) {
  const { value, checked } = e.target;

  if (checked) {
    setData({
      ...data,
      size: [...data.size, value],
    });
  } else {
    setData({
      ...data,
      size: data.size.filter((item) => item !== value),
    });
  }
}


  async function getData() {
    const response = await api.get("/category");
    const res = response.data;
    if (res?.success) {
      console.log(res);
      setCategories(res?.data);
    }
  }

 async function getProductsData() {
  const response = await api.get(
    `/products/all?page=${page}&limit=8`
  );

  const res = response.data;

  if (res?.success) {
    setProductsData(res.data);
    setPagination(res.pagination);
  }
}

async function deleteProduct(productId) {
  try {
    const response = await api.delete("/products", {
      data: {
        productId,
      },
    });

    const res = response.data;

    if (res.success) {
      alert("Product Deleted Successfully");
      getProductsData(); // List refresh
    }
  } catch (error) {
    console.log(error);
    alert("Unable To Delete Product");
  }
}
  function handleEdit(product) {
  setIsMenuOpen(true);
  setIsEditMode(true);
  setEditProductId(product._id);

  setData({
    title: product.title,
    description: product.description,
    price: product.price,
    discount: product.discount,
      rating: product.rating,
    stock: product.stock,
    category: product.category,
    subcategory: product.subcategory,
    size: product.size || [],
    keywords: product.keywords?.join(", ") || "",
    images: [],
    oldImages: product.images || [],
  });
}



 useEffect(() => {
  getData();
}, []);

useEffect(() => {
  getProductsData();
}, [page]);



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
    <section className={style.adminProducts}>
      {isMenuOpen && (
        <div className={style.addProductOverlay}>
          <form className={style.addProductForm}>
            {/* Header */}
            <div className={style.addProductHeader}>
              <h1>{isEditMode ? "Edit Product" : "Add Product"}</h1>
              <RxCross2
                className={style.closeButton}
                onClick={() => setIsMenuOpen(false)}
              />
            </div>

            <div className={style.formBody}>
              {/* Product Name */}
              <div className={style.formRow}>
                <label>Product Name</label>
                <input
                  type="text"
                  placeholder="Enter product name"
                  name="title"
                  onChange={handleChange}
                  value={data.title}
                />
              </div>

              {/* Description */}
              <div className={style.formRow}>
                <label>Description</label>
                <textarea
                  rows="5"
                  placeholder="Enter product description"
                  name="description"
                  onChange={handleChange}
                  value={data.description}
                />
              </div>

              {/* Price */}
              <div className={style.formRow}>
                <label>Price</label>
                <input
                  type="number"
                  placeholder="Enter price"
                  name="price"
                  onChange={handleChange}
                  value={data.price}
                />
              </div>

              {/* Discount */}
              <div className={style.formRow}>
                <label>Discount (%)</label>
                <input
                  type="number"
                  placeholder="Enter discount"
                  name="discount"
                  onChange={handleChange}
                  value={data.discount}
                />
              </div>

              {/* Stock */}
              <div className={style.formRow}>
                <label>Stock</label>
                <input
                  type="number"
                  placeholder="Available stock"
                  name="stock"
                  onChange={handleChange}
                  value={data.stock}
                />
              </div>
                         <div className={style.formRow}>
                     <label>Rating</label>

                           <input
                        type="number"
                         min="1"
                        max="5"
                             step="0.1"
                           name="rating"
                            value={data.rating}
                        onChange={handleChange}
                        />
                       </div>


              {/* Category */}
              <div className={style.formRow}>
                <label>Category</label>

                <select
                  name="category"
                  value={data.category}
                  onChange={handleChange}
                >
                  <option>Select Category</option>
                  {categories.map((category) => {
                    return (
                      <option value={category._id} key={category._id}>
                        {category?.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Sub Category */}
              <div className={style.formRow}>
                <label>Sub Category</label>

                <input
                  type="text"
                  placeholder="Sub Category"
                  name="subcategory"
                  value={data.subcategory}
                  onChange={handleChange}
                />
              </div>

             <div className={style.formRow}>
  <label>Size</label>

  <div className={style.sizeContainer}>
    <label>
      <input
        type="checkbox"
        value="XS"
        checked={data.size.includes("XS")}
        onChange={handleSizeChange}
      />
      XS
    </label>

    <label>
      <input
        type="checkbox"
        value="S"
        checked={data.size.includes("S")}
        onChange={handleSizeChange}
      />
      S
    </label>

    <label>
      <input
        type="checkbox"
        value="M"
        checked={data.size.includes("M")}
        onChange={handleSizeChange}
      />
      M
    </label>

    <label>
      <input
        type="checkbox"
        value="L"
        checked={data.size.includes("L")}
        onChange={handleSizeChange}
      />
      L
    </label>

    <label>
      <input
        type="checkbox"
        value="XL"
        checked={data.size.includes("XL")}
        onChange={handleSizeChange}
      />
      XL
    </label>
  </div>
</div>



                {/* Keywords */}
               <div className={style.formRow}>
                  <label>Keywords</label>

                     <input
               type="text"
                  placeholder="men, shirt, cotton, casual"
                name="keywords"
                value={data.keywords}
             onChange={handleChange}
  />
</div>




              {/* Images */}
              <div className={style.formRow}>
                <label>Product Images</label>

                        {data.oldImages.length > 0 && (

<div className={style.imagePreview}>

{data.oldImages.map((img,index)=>(

                 <img
               key={index}
             src={`http://localhost:4000/uploads/${img}`}
                  alt=""
                  width="100"
                   />

                  ))} </div>
                )}
                      

                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    setData({ ...data, images: e.target.files });
                  }}
                />
              </div>
              {/* Submit */}

              <input
                type="submit"
                className={style.submitBtn}
                onClick={handleSubmit}
               value={isEditMode ? "Update Product" : "Add Product"}

              />
            </div>
          </form>
        </div>
      )}

      <div className={style.adminProductsHeader}>
        <h1>Admin Products</h1>
        <button onClick={() => setIsMenuOpen(true)}>Add Product</button>
      </div>

      {/* Products */}
      <div className={productCSS["product-grid"]}>
        {productsData.map((product) => (
          <div key={product?._id} className={productCSS["product-card"]}>
            <div className={productCSS["image-wrapper"]}>
              <img src={ IMAGE_API+product?.images?.[0]} alt={product?.title} />

              <button
           type="button"
           className={style.productDeleteBtn}
             aria-label="Delete"
             onClick={() => deleteProduct(product._id)}
            >
             <AiFillDelete className={style.deleteIcon} />
            </button>
             
              <button
  type="button"
  className={productCSS["quick-add-btn"]}
  onClick={() => handleEdit(product)}
>
  Edit
</button>


            </div>
<div className={productCSS["product-info"]}>
  <h2 className={productCSS["product-title"]}>
    {product?.title}
  </h2>

  <p className={productCSS["product-price"]}>
    ₹ {product.price.toLocaleString()}
  </p>

  {product.discount > 0 && (
    <p className={productCSS["product-discount"]}>
      {product.discount}% OFF
    </p>
  )}

  <p className={productCSS["product-rating"]}>
    ⭐ {product.rating}
  </p>
</div>
           
          </div>
        ))}
      </div>

      {productsData.length > 0 && (
  <div className={productCSS.pagination}>

    <button
      type="button"
      className={productCSS["page-arrow"]}
      disabled={!pagination.isPrevPage}
      onClick={() => setPage((prev) => prev - 1)}
    >
      Prev
    </button>

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

    <button
      type="button"
      className={productCSS["page-arrow"]}
      disabled={!pagination.isNextPage}
      onClick={() => setPage((prev) => prev + 1)}
    >
      Next
    </button>

  </div>
)}
    </section>
  );
}

export default AdminProducts;