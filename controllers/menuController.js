import menuItem from "../models/menuModel.js";

const createMenu = async (req, res) => {
    try {
        const newMenu = req.body;
        const id = req.restaurant_id;
        newMenu["restaurant_id"] = id;
        const addMenu = await menuItem.create(newMenu);
        if (addMenu) {
            res.status(201).json({ message: "Menu added successfully!" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error adding menu!" });
    }
};

//update menu
const updateMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const newMenuInfo = req.body;
    const findMenu = await menuItem.findByPk(id);
    if (!findMenu) {
      return res.status(404).json({ message: "Recored not found!" });
    }
    const updateRecord = await menuItem.update(newMenuInfo, {where: { id: id }});
    if (updateRecord) {
      res.status(200).json({ message: "Update successful!", updateRecord });
    }
  } catch (error) {
console.log(error);
    res.status(500).json({ messaage: "Error!" });
  }
};

//view one menu item
const oneMenu = async(req, res)=>{
   try{
     const{id}= req.params;
     const findMenu = await menuItem.findByPk(id);
     if(!findMenu){
      return res.status(404).json({message:"Record not found"});
     }
     res.status(200).json({messaage:"Success", findMenu});
   }catch(error){
    console.log(error);
    res.status(500).json({ messaage: "Error!" });
   }

}

//view all menu of a restaurant
const getAllMenu= async (req, res) => {
  try {
    const restaurant_id = req.restaurant_id;
    const findAllMenu = await menuItem.findAll({
      where: { restaurant_id: restaurant_id },
    });
    if (findAllMenu) {
      return res.status(200).json(findAllMenu);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error getting menu" });
  }
};

// delete menu
const cancelMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const findMenu = await menuItem.findByPk(id);
    if (!findMenu) {
      return res.status(404).json({ message: "Record not found!" });
    }
    const deleteMenu = await menuItem.destroy({where: { id: id }});
    if (deleteMenu) {
      res.status(200).json({ message: "Canceled successfully!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error!" });
  }
};

export { createMenu, updateMenu, cancelMenu, getAllMenu, oneMenu };