import { Offcanvas, Stack } from "react-bootstrap"
import { useShoppingCart } from "../Context/ShoppingCartContext"
import { formatCurrency } from "../Utilities/formatCurrency"
import { CartItem } from "./CartItem"
import storeItems from "../Data/items.json"
import consoleItems from "../Data/consoles.json" 

type ShoppingCartProps = {
  isOpen: boolean
}

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart()

  // Merge items from both datasets
  const allItems = [...storeItems, ...consoleItems]

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map(cartItem => {
            const item = allItems.find(item => item.id === cartItem.id)
            if (!item) return null
            return <CartItem key={item.id} {...item} quantity={cartItem.quantity} />
          })}
          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = allItems.find(i => i.id === cartItem.id)
                return total + (item?.price || 0) * cartItem.quantity
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  )
}
