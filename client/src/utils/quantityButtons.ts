export function setupQuantityButtons(
  increaseButton: HTMLButtonElement,
  decreaseButton: HTMLButtonElement,
  quantityValue: HTMLSpanElement,
  initialQuantity: number
) {
  let quantity = initialQuantity;

  increaseButton.addEventListener("click", () => {
    quantity++;
    updateQuantity();
  });

  decreaseButton.addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      updateQuantity();
    }
  });

  function updateQuantity() {
    quantityValue.textContent = quantity.toString();
  }

  return {
    getQuantity: () => quantity,
  };
}
