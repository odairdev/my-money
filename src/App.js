import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

import { Home } from "./pages/home/Home";
import { Login } from "./pages/login/Login";
import { Signup } from "./pages/signup/Signup";
import { Navbar } from "./components/Navbar";

function App() {
  const { authIsReady, user } = useAuth();

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route path={"/"} exact>
              {!user && <Redirect to={'/login'} />}
              {user && <Home />}
            </Route>
            <Route path={"/login"}>
              {!user && <Login />}
              {user && <Redirect to={'/'} />}
            </Route>
            <Route path={"/signup"}>
              {!user && <Signup />}
              {user && <Redirect to={'/'} />}
            </Route>
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
