import { Route, Switch } from "wouter";
import ChatPage from "./pages/chat";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/chat" component={ChatPage} />
      <Route>❌ 404 Not Found</Route>
    </Switch>
  );
}

export default App;
