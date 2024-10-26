import itemData from "../Model/ItemSchema.js";
import ProductList from "../Model/ItemSchema.js";
// Controller to Add Items
const addItems = async (req, res) => {
   
        console.log("Request Body:", req.body); // Log the incoming request body
        const { email, items } = req.body;

    
        try {
           
            // Validate items array
            if (!Array.isArray(items) || items.length === 0) {
                return res.status(400).json({ message: "Items array is required." });
            }
    
            // Create a new product list
            const newProductList = new ProductList({
                items,
                email
            });
    
            // Save the product list to the database
            await newProductList.save();
    
            return res.status(201).json({ message: "Items added successfully!" });
        } catch (error) {
            console.error("Error saving items:", error);
            return res.status(500).json({ message: "Failed to save items.", error }); // Include error detail for debugging
        }
    };


// Controller to List Items by Email
const listItems = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    const items = await ProductList.find({ email });

    res.status(200).json({
      success: true,
      data: items,
    });
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch items.",
      error,
    });
  }
};

export { addItems,listItems };
