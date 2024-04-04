import React, { useState } from "react";
import consoles from "../Data/consoles.json";
import { ConsolesItem } from "./ConsoleItem";
import "../Styles/styles.css";

export default function ConsoleFilters() {
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleFilterButtonClick = (selectedCategory) => {
    if (selectedFilters.includes(selectedCategory)) {
      setSelectedFilters(
        selectedFilters.filter((el) => el !== selectedCategory)
      );
    } else {
      setSelectedFilters([...selectedFilters, selectedCategory]);
    }
  };

  // Filter the consoles based on selected category
  const filteredConsoles =
    selectedFilters.length === 0
      ? consoles
      : consoles.filter((console) =>
          selectedFilters.includes(console.category)
        );

  return (
    <div>
      <div className="buttons-container">
        {["Nintendo", "PlayStation", "Xbox"].map((category, idx) => (
          <button
            onClick={() => handleFilterButtonClick(category)}
            className={`button ${
              selectedFilters.includes(category) ? "active" : ""
            }`}
            key={`filters-${idx}`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="items-container">
        {filteredConsoles.map((console, idx) => (
          <ConsolesItem
            key={`consoles-${idx}`}
            id={console.id}
            name={console.name}
            price={console.price}
            imgUrl={console.imgUrl}
          />
        ))}
      </div>
    </div>
  );
}
