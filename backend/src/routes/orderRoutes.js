const express= require("express");
const {
   getAllOrders,
    getUserOrders,
    createOrder,
    updateOrder,
} = require("../controllers/orderControllers");

const asyncHandler = require("../utils/asyncHandler");
const authMiddleware = require("../middlewares/authMiddleware");
const checkAdminMiddleware = require("../middlewares/checkAdminMiddleware");

const router = express.Router();

router.get("/all",
    asyncHandler(authMiddleware),
    asyncHandler(checkAdminMiddleware),
    asyncHandler(getAllOrders),
);
router.get("/user-orders",
    asyncHandler(authMiddleware),
    asyncHandler(getUserOrders),
);
router.post("/create",
    asyncHandler(authMiddleware),
    asyncHandler(createOrder)
);
router.put("/update-status/",
    asyncHandler(authMiddleware),
    asyncHandler(checkAdminMiddleware),
    asyncHandler(updateOrder),
);
module.exports=router;



















// orderRoutes: All routes related to order
// GET"/all: get all order of a customer/user.(only access to admin)
// GET :/user-orders: get all orders for current login users(user must be login  )
// POST:/Create : used to create order.(user must be login)
// PUT:/update-status:used to  update order status(only access by admin)
// authMiddleware token verify kerta hai aur user ki information req.user me store kerta hai
