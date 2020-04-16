import React from 'react';
import {Route, Switch} from "react-router";
import NavBar from "./components/NavBar/NavBar";
import Container from "@material-ui/core/Container";
import AddCocktail from "./components/AddCokctail/AddCocktail";
import MyPublications from "./components/MyPublications/MyPublications";
import Cocktail from "./components/Cocktail/Cocktail";
import AllCocktails from "./components/AllCocktails/AllCocktails";

function App() {
  return (
      <div>
        <NavBar/>
        <Container>
          <Switch>
              <Route path='/' exact component={AllCocktails} />
              <Route path='/addCocktail' exact component={AddCocktail} />
              <Route path='/myPublications' exact component={MyPublications} />
              <Route path='/cocktail/:id' component={Cocktail} />
          </Switch>
        </Container>
      </div>
  );
}

export default App;