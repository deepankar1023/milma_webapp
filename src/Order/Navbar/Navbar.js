import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

const Button = ({ children, variant, className, onClick, as: Component = 'button', ...props }) => {
  const baseStyle = "px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantStyles = {
    default: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500",
    ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
  };

  return (
    <Component
      className={`${baseStyle} ${variantStyles[variant] || variantStyles.default} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </Component>
  );
};

const DropdownMenu = ({ children, trigger }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {React.cloneElement(trigger, { onClick: () => setIsOpen(!isOpen) })}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50">
          {children}
        </div>
      )}
    </div>
  );
};

const DropdownMenuContent = ({ children }) => (
  <div className="py-1">{children}</div>
);

const DropdownMenuItem = ({ children, className, ...props }) => (
  <div className={`px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${className}`} {...props}>
    {children}
  </div>
);

const DropdownMenuLabel = ({ children }) => (
  <div className="px-4 py-2 text-sm font-semibold text-gray-900">{children}</div>
);

const DropdownMenuSeparator = () => (
  <hr className="my-1 border-gray-200" />
);

const MenuNavbar = ({ cart, getTotalCartValue, onAddressChange }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const items = Object.values(cart);
    setCartItems(items);
  }, [cart]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white bg-opacity-95 backdrop-blur">
      <div className="container mx-auto px-4 flex h-16 items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo.png" alt="AlCheta Logo" className="w-10 h-10" />
          <span className="text-xl font-bold">AlCheta</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" as={Link} to="/">
              Home
            </Button>
            <Button variant="ghost" as={Link} to="/products">
              Products
            </Button>
            <Button variant="ghost" onClick={onAddressChange}>
              Change Address
            </Button>
          </nav>
          <DropdownMenu
            trigger={
              <Button variant="outline" className="relative">
                <ShoppingCart className="mr-2 h-4 w-4" />
                <span>Cart ({cartItems.length})</span>
                <span className="sr-only">Shopping Cart</span>
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-blue-500 text-xs text-white flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Button>
            }
          >
            <DropdownMenuContent>
              <DropdownMenuLabel>Shopping Cart</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {cartItems.length === 0 ? (
                <DropdownMenuItem>Your cart is empty.</DropdownMenuItem>
              ) : (
                cartItems.map((item) => (
                  <DropdownMenuItem key={item.product.id} className="flex items-center p-2">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 rounded-md object-cover"
                    />
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium">{item.product.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium">
                      ${(item.quantity * parseFloat(item.product.price)).toFixed(2)}
                    </p>
                  </DropdownMenuItem>
                ))
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-between">
                <span>Total:</span>
                <span className="font-bold">${getTotalCartValue().toFixed(2)}</span>
              </DropdownMenuItem>
              <DropdownMenuItem as={Link} to="/cart" className="w-full text-center">
              <Link to="/cart"><Button variant="default" className="w-full mt-2">
                  View Cart
                </Button>
                
                </Link>
                
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default MenuNavbar;

