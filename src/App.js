import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import RecipeDetails from "./components/recipes/recipe-details/RecipeDetails";
import RecipeAdd from "./components/recipes/recipe-add/RecipeAdd";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import MyRecipes from "./components/recipes/my-recipes/MyRecipes";
import ShoppingList from "./components/shopping/ShoppingList";
import RecipeEdit from "./components/recipes/recipe-edit/RecipeEdit";
import MyFavorites from "./components/recipes/my-recipes/MyFavorites";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/recipe/:id" component={RecipeDetails} />
            <Route path="/new-recipe" component={RecipeAdd} />
            <Route path="/edit-recipe/:id" component={RecipeEdit} />
            <Route path="/my-recipes" component={MyRecipes} />
            <Route path="/login" component={SignIn} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/shopping-list" component={ShoppingList} />
            <Route path="/my-favorites" component={MyFavorites} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
