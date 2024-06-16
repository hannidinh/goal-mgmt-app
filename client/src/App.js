
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Goal from "./pages/Goal";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        friends: {
          merge(existing, incoming) {
            return incoming;
          }
        },
        goals: {
          merge(existing, incoming) {
            return incoming;
          }
        }
      }
    }
  }
});

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache,
});


function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Header/>
          <div className="container">
            <Routes>
              <Route>
                <Route path='/' element={<Home />} />
                <Route path='/goals/:id' element={<Goal />} />
                <Route path='*' element={<NotFound />} />
              </Route>
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
