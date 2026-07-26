import "./AdminCategory.css";
import { RxCross2 } from "react-icons/rx";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import api from "../../utils/api";


function AdminCategory() {
  const [data, setData] = useState({
    name: "",
    icon: "",
    subcategory: "",
  });

  const [categories, setCategories] = useState([]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
const [editId, setEditId] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }


  function editCategory(category) {
  setIsMenuOpen(true);
  setIsEdit(true);
  setEditId(category._id);

  setData({
    name: category.name,
    icon: category.icon,
    subcategory: category.subcategory.join(","),
  });
}

  async function handleSubmit(e) {
  e.preventDefault();

  const newData = {
    ...data,
    subcategory: data.subcategory.split(","),
  };

  try {
    let response;

    if (isEdit) {
      // Update Category
      response = await api.put("/category", {
        ...newData,
        categoryId: editId,
      });
    } else {
      // Add Category
      response = await api.post("/category", newData);
    }

    const res = response.data;

    if (res.success) {
      alert(res.message);

      getData();

      setIsMenuOpen(false);

      setIsEdit(false);

      setEditId("");

      setData({
        name: "",
        icon: "",
        subcategory: "",
      });
    }
  } catch (error) {
    console.log(error);
    alert(error.response?.data?.message || "Something went wrong");
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

  async function deleteCategory(categoryId) {
  try {
    const response = await api.delete("/category", {
      data: {
        categoryId,
      },
    });

    if (response.data.success) {
      alert(response.data.message);

      // UI refresh
      getData();
    }
  } catch (error) {
    console.log(error);
    alert(error.response?.data?.message || "Delete Failed");
  }
}
  useEffect(() => {
    getData();
  }, []);

  return (
    <section className="adminCategory">
      {/* Add Category Modal */}

      {isMenuOpen && (
        <div className="categoryOverlay">
          <form className="categoryForm">
            <div className="categoryHeader">
             <h2>{isEdit ? "Edit Category" : "Add Category"}</h2>

              <RxCross2
  className="closeBtn"
  onClick={() => {
    setIsMenuOpen(false);
    setIsEdit(false);
    setEditId("");

    setData({
      name: "",
      icon: "",
      subcategory: "",
    });
  }}
/>
            </div>

            <div className="categoryBody">
              <div className="formRow">
                <label>Category Name</label>
                <input
                  type="text"
                  placeholder="Category Name"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                />
              </div>

              <div className="formRow">
                <label>Icon</label>
                <input
                  type="text"
                  placeholder="🛋️ or Icon URL"
                  name="icon"
                  value={data.icon}
                  onChange={handleChange}
                />
              </div>

              <div className="formRow">
                <label>Sub Categories</label>

                <textarea
                  rows="5"
                  placeholder="One sub category per line"
                  name="subcategory"
                  value={data.subcategory}
                  onChange={handleChange}
                ></textarea>
              </div>

           <button
  type="submit"
  className="submitBtn"
  onClick={handleSubmit}
>
  {isEdit ? "Update Category" : "Add Category"}
</button>
            </div>
          </form>
        </div>
      )}

      {/* Header */}

      <div className="categoryTop">
        <h1>Categories</h1>
<button
  onClick={() => {
    setIsMenuOpen(true);
    setIsEdit(false);
    setEditId("");

    setData({
      name: "",
      icon: "",
      subcategory: "",
    });
  }}
>
  Add Category
</button>
          </div>

      {/* Table */}

      <div className="tableWrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Icon</th>
              <th>Sub Categories</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((cat) => (
              <tr key={cat._id}>
                <td>{cat.name}</td>

                <td className="iconCell">{cat.icon}</td>

                <td>{cat.subcategory.join(", ")}</td>

                <td>{cat.createdAt}</td>

                <td>
                 
                  
                   <button
                 className="deleteBtn"
               onClick={() => deleteCategory(cat._id)}
                      >
              <FaTrash />
               </button>
                   <button
                        className="editBtn"
                      onClick={() => editCategory(cat)}
                       >
                    <FaEdit />
                    </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default AdminCategory;