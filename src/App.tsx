import "./App.css";
import {AuthButton} from "./components/AuthButton/AuthButton";
import TonConnector from "./components/Ton-Connector";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Ton Sample TWA</h1>
        <TonConnector />
          <AuthButton />
      </div>
    </QueryClientProvider>
  );
}

export default App;
