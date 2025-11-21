// Simple cart store using localStorage for persistence
const CART_KEY = 'minimal_shop_cart_v1';

function getCart(){
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; }
}
function setCart(next){ localStorage.setItem(CART_KEY, JSON.stringify(next)); }

function addToCart(product, qty=1){
  const cart = getCart();
  const existing = cart.find(i=>i.id===product.id);
  if(existing) existing.qty += qty; else cart.push({ id: product.id, qty });
  setCart(cart);
}
function removeFromCart(id){
  const cart = getCart().filter(i=>i.id!==id);
  setCart(cart);
}
function changeQty(id, delta){
  const cart = getCart();
  const item = cart.find(i=>i.id===id);
  if(!item) return;
  item.qty += delta;
  if(item.qty<=0){
    const next = cart.filter(i=>i.id!==id);
    setCart(next);
  } else {
    setCart(cart);
  }
}
function countCart(){ return getCart().reduce((a,i)=>a+i.qty,0); }
function updateNavCount(){ const el = document.getElementById('navCount'); if(el) el.textContent = countCart(); }
