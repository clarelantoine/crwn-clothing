import Directory from "./components/directory/directory.component";

export default function App() {
  
  const categories = [
    {
      "id": 1,
      "title": "hats",
      "imageUrl": "./images/hats.jpg"
    },
    {
      "id": 2,
      "title": "jackets",
      "imageUrl": "./images/jackets.jpg"
    },
    {
      "id": 3,
      "title": "sneakers",
      "imageUrl": "./images/sneakers.jpg"
    },
    {
      "id": 4,
      "title": "womens",
      "imageUrl": "./images/womens.jpg"
    },
    {
      "id": 5,
      "title": "mens",
      "imageUrl": "./images/men.jpg"
    }
  ]

  return (
    <Directory categories={categories} />
  );
}


// <div className="caterogy-container">
// {/* <img src="" /> */}
// <div className="category-body-container">
//   <h2>Jackets</h2>
//   <p>Shop now</p>
// </div>
// </div>

// <div className="caterogy-container">
// {/* <img src="" /> */}
// <div className="category-body-container">
//   <h2>Sneakers</h2>
//   <p>Shop now</p>
// </div>
// </div>

// <div className="caterogy-container">
// {/* <img src="" /> */}
// <div className="category-body-container">
//   <h2>Women</h2>
//   <p>Shop now</p>
// </div>
// </div>

// <div className="caterogy-container">
// {/* <img src="" /> */}
// <div className="category-body-container">
//   <h2>Men</h2>
//   <p>Shop now</p>
// </div>
// </div>