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

    // Find the user by email
    const user = await ProductList.findOne({ email });

    if (!user) {
      // Create a new product list if user doesn't exist
      const newProductList = new ProductList({
        email,
        items,
      });
      await newProductList.save();
      return res.status(201).json({ message: "New user created, and items added successfully!" });
    } else {
      // Update existing user's items using $push to add to the array
      await user.updateOne({
        $push: { items: { $each: items } },
      });
      return res.status(200).json({ message: "Items updated successfully!" });
    }
  } catch (error) {
    console.error("Error saving items:", error);
    return res.status(500).json({ message: "Failed to save items.", error });
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

    const items = await ProductList.findOne({ email });

    if (!items) {
      return res.status(404).json({
        success: false,
        message: "No items found for this email.",
      });
    }

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

export { addItems, listItems };
