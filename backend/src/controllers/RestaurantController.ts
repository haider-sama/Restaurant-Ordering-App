import { Request, Response } from "express";
import Restaurant from "../models/restaurant";

// Fetch a single restaurant by its ID
const getRestaurant = async (req: Request, res: Response) => {
  try {
    const { restaurantId } = req.params;

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.json(restaurant);
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    res.status(500).json({ message: "Error fetching restaurant" });
  }
};

// Search restaurants based on city, search query, cuisines, and sort options
const searchRestaurant = async (req: Request, res: Response) => {
  try {
    const { city } = req.params;
    const searchQuery = req.query.searchQuery as string || "";
    const selectedCuisines = req.query.selectedCuisines as string || "";
    const sortOption = req.query.sortOption as string || "lastUpdated";
    const page = parseInt(req.query.page as string) || 1;

    // Initialize query object
    let query: Record<string, any> = {};
    query["city"] = new RegExp(city, "i");

    // Check if there are any restaurants in the city
    const cityCount = await Restaurant.countDocuments(query);
    if (cityCount === 0) {
      return res.status(404).json({
        data: [],
        pagination: {
          total: 0,
          page: 1,
          pages: 1,
        },
      });
    }

    // Apply cuisines filter
    if (selectedCuisines) {
      const cuisinesArray = selectedCuisines.split(",").map(cuisine => new RegExp(cuisine, "i"));
      query["cuisines"] = { $all: cuisinesArray };
    }

    // Apply search query
    if (searchQuery) {
      const searchRegex = new RegExp(searchQuery, "i");
      query["$or"] = [
        { restaurantName: searchRegex },
        { cuisines: { $in: [searchRegex] } },
      ];
    }

    // Pagination and sorting
    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    const restaurants = await Restaurant.find(query)
      .sort({ [sortOption]: 1 })
      .skip(skip)
      .limit(pageSize)
      .lean();

    const total = await Restaurant.countDocuments(query);

    res.json({
      data: restaurants,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / pageSize),
      },
    });
  } catch (error) {
    console.error("Error searching restaurants:", error);
    res.status(500).json({ message: "Error searching restaurants" });
  }
};

export default {
  getRestaurant,
  searchRestaurant,
};
