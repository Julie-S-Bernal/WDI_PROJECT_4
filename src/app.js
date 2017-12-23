import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./components/utility/Routes";
import Navbar from "./components/utility/Navbar";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import { grey, red, deepPurple } from "material-ui/colors";
import "./scss/style.scss";

const accent = grey["50"]; // ---> #fafafa
const second = deepPurple["900"];

const theme = createMuiTheme({
  palette: {
    primary: {
      ...grey,
      500: accent
    }, // Purple and green play nicely together.
    secondary: {
      ...deepPurple,
      900: second
    },
    error: red
  }
});

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <div className="container">
            <Navbar />
            <main>
              <Routes />
            </main>
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
