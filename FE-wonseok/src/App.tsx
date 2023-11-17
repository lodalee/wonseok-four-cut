import Providers from "./providers";
import Nav from "./routes/route";
import GlobalStyle from "./lib/style/globalstyle";

function App() {
  return (
    <Providers>
      <GlobalStyle />
      <Nav />
    </Providers>
  );
}

export default App;
