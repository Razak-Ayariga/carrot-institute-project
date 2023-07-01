import menuItem from "../models/menuModel.js";
import orders from "../models/ordersModel.js";

const placeOrder = async (req, res) => {
    try {
        const newOrder = req.body;
        const id = req.user_id;
        newOrder["user_id"] = id;
        const {menuId} = req.params
        const findMenu = await menuItem.findByPk(menuId);
        if(!findMenu){
          return res.status(404).json({message:"Menu not found"});
        }
        const addOrder = await orders.create(newOrder);
        if (addOrder) {
            res.status(201).json({ message: "Order successful!" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error!" });
    }
};

//update order
const updateOrder = async (req, res) => {
  const newOrderInfo = req.body;
  try {
    const { id } = req.params;
    const findOrder = await orders.findByPk(id);
    if (!findOrder) {
      return res.status(404).json({ message: "Recored not found!" });
    }
    const updateRecord = await orders.update(newOrderInfo, {where: { id: id }});
    if (updateRecord) {
      res.status(200).json({ message: "Update successful!", updateRecord});
    }
  } catch (error) {
console.log(error);
    res.status(500).json({ messaage: "Error!" });
  }
};

//get one order
const oneOrder = async(req, res)=>{
  try{
     const{id}= req.params;
     const findOrder = await orders.findByPk(id);
     if(!findOrder){
      return res.status(404).json({message:"Order not found"});
     }
     res.status(200).json({mesage:"successful", findOrder});
  }catch(error){
    console.log(error).json({message:"Error getting record"});
  }
}

// get all orders of a user
const getAllUserOrders= async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const findAllOrders = await orders.findAll({
      where: { user_id: user_id },
    });
    if (findAllOrders) {
      return res.status(200).json(findAllOrders);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error getting orders" });
  }
};

// cancel order
const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const findOrder = await orders.findByPk(id);
    if (!findOrder) {
      return res.status(404).json({ message: "Record not found!" });
    }
    const deleteRecord = await orders.destroy({where: { id: id },});
    if (deleteRecord) {
      res.status(200).json({ message: "Canceled successfully!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error!" });
  }
};

export { placeOrder, updateOrder, oneOrder, getAllUserOrders, cancelOrder };