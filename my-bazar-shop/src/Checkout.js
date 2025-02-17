import React from "react";

import { LoadingIcon } from "./Icons";
import { getStoreItems } from "./getDataService";
import "./App.css";

// You are provided with an incomplete <Checkout /> component.
// You are not allowed to add any additional HTML elements.
// You are not allowed to use refs.

// Once the <Checkout /> component is mounted, load the products using the getStoreItems function.
// Once all the data is successfully loaded, hide the loading icon.
// Render each product object as a <Product/> component, passing in the necessary props.
// Implement the following functionality:
//  - The add and remove buttons should adjust the ordered quantity of each product
//  - The add and remove buttons should be enabled/disabled to ensure that the ordered quantity can’t be negative and can’t exceed the Stock for that product.
//  - The total shown for each product should be calculated based on the ordered quantity and the price
//  - The total in the order summary should be calculated
//  - For orders over ₹1000, apply a 18% GST to the order. Display the GST text only if a GST has been applied.
//  - The total should reflect any GST that has been applied
//  - All Ruppes amounts should be displayed to 2 decimal places

const Product = ({
  id,
  productName,
  stock,
  price,
  quantity,
  total,
  calculateTotal,
}) => {
  return (
    <tr key={id}>
      <td>{id}</td>
      <td>{productName}</td>
      <td>{stock}</td>
      <td>₹{price}</td>
      <td>{quantity}</td>
      <td>₹{total}</td>
      <td>
        <button
          onClick={() => calculateTotal(id, 1)}
          disabled={quantity >= stock}
          className="actionButton"
        >
          +
        </button>
        <button
          onClick={() => calculateTotal(id, -1)}
          disabled={quantity <= 0}
          className="actionButton"
        >
          -
        </button>
      </td>
    </tr>
  );
};

const Checkout = () => {
  const [listItems, setListItems] = React.useState([]);

  const fetchData = async () => {
    try {
      let data = await getStoreItems();
      data = data?.map((items) => ({ ...items, quantity: 0, total: 0 }));
      setListItems(data);
    } catch (e) {
      console.log(e);
    }
  };

  const calculateTotal = (id, val) => {
    setListItems((prev) =>
      prev.map((item) =>
        item?.id === id
          ? {
              ...item,
              quantity: item.quantity + val,
              total: (item.quantity + val) * item.price,
            }
          : item
      )
    );
  };

  const totalAmount = listItems.reduce((sum, item) => sum + item.total, 0);
  const gstAmount = totalAmount > 1000 ? totalAmount * 0.18 : 0;
  const finalAmount = totalAmount + gstAmount;

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <header className="header">
        <h1>My Bajar Shop</h1>
      </header>
      <main>
        {listItems.length === 0 && <LoadingIcon />}
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Stock</th>
              <th>Price (₹) </th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {listItems?.map((item) => (
              <Product
                key={item?.id}
                id={item?.id}
                productName={item?.name}
                stock={item?.stock}
                price={item?.price}
                quantity={item?.quantity}
                total={item?.total}
                calculateTotal={calculateTotal}
              />
            ))}
          </tbody>
        </table>
        <h2>Order Details</h2>
        <p>GST: ₹{gstAmount.toFixed(2)}</p>
        <p>Total: ₹{finalAmount.toFixed(2)}</p>
      </main>
    </div>
  );
};

export default Checkout;
