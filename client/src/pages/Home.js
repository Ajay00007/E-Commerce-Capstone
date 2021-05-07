import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Jumbotron } from "react-bootstrap";
import { APIpaths } from "../API";
import CarouselItems from "../components/CarouselItems";
import FeaturedItems from "../components/FeaturedItems";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Home() {
  const [itemsData, setItemsData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(APIpaths.getAllItems)
      .then((res) => {
        if (res.data.results.length > 0) {
          setItemsData(res.data.results);
        }
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container className="min-vh-100 mt-5">
      <Jumbotron>
        <h1>EcoMetrix Ecommerce</h1>
        <p>
          Online shopping made easy!{" "}
          <span role="img" aria-label="party">
            🎉
          </span>
        </p>
      </Jumbotron>
      {loading ? <LoadingSpinner /> : <CarouselItems items={itemsData} />}
      {loading ? <LoadingSpinner /> : <FeaturedItems items={itemsData} />}
    </Container>
  );
}
