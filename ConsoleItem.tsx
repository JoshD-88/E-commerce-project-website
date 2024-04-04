import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useShoppingCart } from "../Context/ShoppingCartContext";
import { formatCurrency } from "../Utilities/formatCurrency";

type ConsolesItemProps = {
  id: number;
  name: string;
  price: number;
  category: string;
  imgUrl: string;
};

export function ConsolesItem({ id, name, price, imgUrl }: ConsolesItemProps) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const quantity = getItemQuantity(id);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="h-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        transform: isHovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: isHovered ? "0 5px 15px rgba(0, 0, 0, 0.3)" : "none",
      }}
    >
      <Card.Img
        variant="top"
        src={imgUrl}
        height="200px"
        width="10px"
        style={{ objectFit: "contain" }}
      />
      <Card.Body className="d-flex flex-column w-1">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button className="w-100" onClick={() => increaseCartQuantity(id)}>
              + Add To Cart
            </Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: ".5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                <div>
                  <span className="fs-3">{quantity}</span> in cart
                </div>
                <Button onClick={() => increaseCartQuantity(id)}>+</Button>
              </div>
              <Button
                onClick={() => removeFromCart(id)}
                variant="danger"
                size="sm"
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
