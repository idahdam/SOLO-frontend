import "./App.css";
import { Route, Switch } from "react-router-dom";
import { Footer, Navbar } from "./components";
import {
  About,
  Add,
  Admin,
  Artist,
  ArtistId,
  GenreId,
  Home,
  SongId,
} from "./pages";

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/add" component={Add} />
        <Route exact path="/about" component={About} />
        <Route exact path="/artist" component={Artist} />
        <Route exact path="/artist/:id-:name" component={ArtistId} />
        <Route exact path="/artist/:id-:name/edit" component={ArtistId} />
        <Route exact path="/song/:id-:name/edit" component={SongId} />
        <Route exact path="/genre/:type" component={GenreId} />
        <Route exact path="/admin" component={Admin} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
