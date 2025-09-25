const GUEST_CART_KEY = "guest_cart_items";

export function getGuestCart() {
  try {
    const raw = localStorage.getItem(GUEST_CART_KEY);
    const items = raw ? JSON.parse(raw) : [];
    return Array.isArray(items) ? items : [];
  } catch {
    return [];
  }
}

export function setGuestCart(items) {
  localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items || []));
}

export function addGuestItem(product) {
  const items = getGuestCart();
  const index = items.findIndex((i) => i.productId === product.productId);
  if (index === -1) {
    items.push({ ...product });
  } else {
    items[index].quantity += product.quantity;
  }
  setGuestCart(items);
  return items;
}

export function updateGuestQty(productId, quantity) {
  const items = getGuestCart();
  const index = items.findIndex((i) => i.productId === productId);
  if (index !== -1) {
    items[index].quantity = quantity;
  }
  setGuestCart(items);
  return items;
}

export function removeGuestItem(productId) {
  const next = getGuestCart().filter((i) => i.productId !== productId);
  setGuestCart(next);
  return next;
}

export function clearGuestCart() {
  localStorage.removeItem(GUEST_CART_KEY);
}


