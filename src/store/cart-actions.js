import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
  return (dispatch) => {
    fetch("https://react-food-9df67-default-rtdb.firebaseio.com/cart.json", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          dispatch(
            uiActions.showNotification({
              status: "error",
              title: "Error!",
              message: "Error in getting cart data!",
            })
          );
        }
        return response.json();
      })
      .then((responseData) => {
        if (responseData === null) {
          return;
        }
        dispatch(
          cartActions.replaceCart({
            cartItems: responseData.cartItems || [],
            totalQuantity: responseData.totalQuantity,
          })
        );
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  };
};

export const sendCartData = (cart) => {
  return (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    fetch("https://react-food-9df67-default-rtdb.firebaseio.com/cart.json", {
      method: "PUT",
      body: JSON.stringify(cart),
    })
      .then((response) => {
        return response.json();
      })
      .then(() => {
        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Success!",
            message: "Sent cart data successfully!",
          })
        );
      })
      .catch((error) => {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: "Error in sending cart data!",
          })
        );
        throw new Error(error.message);
      });
  };
};
