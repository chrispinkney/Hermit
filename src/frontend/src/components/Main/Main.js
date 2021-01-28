import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import Food from '../Food/Food';
import Footer from '../Footer/Footer';
import OrderConfirmation from '../OrderConfirmation/OrderConfirmation';
import Userpage from '../User/Userpage';

class MainPage extends Component {
  // Receiving items added to cart, calculating total,
  // and sending total & cart to header for modal use.
  state = { userInfo: {}, isLoggedIn: false, total: 0.0, cart: [], address: '69+Black+Hawk+Way' };

  componentDidMount = async () => {
    await this.fetchUser();
  };

  fetchUser = async () => {
    const response = await fetch('auth/current_user');
    const userInfo = await response.json();
    if (response.status === 200) {
      this.setState({ userInfo: userInfo, isLoggedIn: true });
    } else {
      // TODO: Figure this out.
    }
  };

  receiveCart = (cart) => {
    this.setState({ cart: cart });

    let priceToAdd = this.state.total;

    // Calculating the total of all the items within the cart.
    this.state.cart.map((item) => {
      priceToAdd = this.state.total + item.price;
      return (priceToAdd = Number(priceToAdd.toFixed(2))); // Rounding the total to nearest cent
    });
    this.setState({ total: priceToAdd });
  };

  // This method receives the updated total and cart from Header.js and then sets the state for Main.js
  receiveCartFromModal = async (updatedCart, updatedTotal) => {
    await this.setState({ cart: updatedCart, total: updatedTotal });
  };

  // This method receives the updated cart and total from OrderConfirmation.js and then sets the state for Main.js
  updateCartQuantities = async (updatedCart) => {
    this.setState({ cart: updatedCart });
    // Calculating the total of all the items within the updated cart.
    let newTotal = 0;
    this.state.cart.forEach((item) => {
      newTotal += item.price * item.quantity;
      return (newTotal = Number(newTotal.toFixed(2))); // Rounding the total to nearest cent
    });

    await this.setState({ total: newTotal });
  };

  render() {
    return (
      <>
        <Header
          userInfo={this.state.userInfo}
          isLoggedIn={this.state.isLoggedIn}
          total={this.state.total}
          cart={this.state.cart}
          receiveCartFromModal={this.receiveCartFromModal}
        />
        <Route exact path="/">
          <Food receiveCart={this.receiveCart} updatedCart={this.state.cart} />
        </Route>

        <Switch>
          <Route exact path="/OrderConfirmation">
            <OrderConfirmation
              cart={this.state.cart}
              address={this.state.address}
              subTotal={this.state.total}
              updateCartQuantities={this.updateCartQuantities}
            />
          </Route>
          <Route exact path="/user">
            <Userpage
              userInfo={this.state.userInfo}
              isLoggedIn={this.state.isLoggedIn}
              cart={this.state.cart}
            />
          </Route>
          <Food receiveCart={this.receiveCart} updatedCart={this.state.cart} />
        </Switch>
        <Footer />
      </>
    );
  }
}

export default MainPage;
