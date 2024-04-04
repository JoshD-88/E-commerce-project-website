import React, { useState } from "react";
import storeItems from "../Data/items.json";
import { StoreItem } from "../Components/StoreItem"; // Import the StoreItem component
import "../Styles/styles.css";

export default function MultiFilters() {
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleFilterButtonClick = (selectedCategory) => {
    if (selectedFilters.includes(selectedCategory)) {
      setSelectedFilters(selectedFilters.filter((el) => el !== selectedCategory));
    } else {
      setSelectedFilters([...selectedFilters, selectedCategory]);
    }
  };

  // Filter the items based on selected category
  const filteredItems = selectedFilters.length === 0
    ? storeItems
    : storeItems.filter(item => selectedFilters.includes(item.category));

  return (
    <div>
      <div className="buttons-container">
        {["Action", "Adventure", "FPS", "RPG", "Indie", "Fighting"].map((category, idx) => (
          <button
            onClick={() => handleFilterButtonClick(category)}
            className={`button ${selectedFilters.includes(category) ? "active" : ""}`}
            key={`filters-${idx}`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="items-container">
        {filteredItems.map((item, idx) => (
          <StoreItem
            key={`items-${idx}`}
            id={item.id}
            name={item.name}
            price={item.price}
            imgUrl={item.imgUrl}
          />
        ))}
      </div>
    </div>
  );
}
