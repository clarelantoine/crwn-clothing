import { Outlet } from "react-router-dom";

import Directory from "../../components/directory/directory.component";

export default function Home() {
  
  const categories = [
    {
      "id": 1,
      "title": "hats",
      "imageUrl": "/images/hats.jpg"
    },
    {
      "id": 2,
      "title": "jackets",
      "imageUrl": "/images/jackets.jpg"
    },
    {
      "id": 3,
      "title": "sneakers",
      "imageUrl": "/images/sneakers.jpg"
    },
    {
      "id": 4,
      "title": "womens",
      "imageUrl": "/images/womens.jpg"
    },
    {
      "id": 5,
      "title": "mens",
      "imageUrl": "/images/men.jpg"
    }
  ]

  return (
    <div>
      <Outlet />
      <Directory categories={categories} />
    </div>
  );
}