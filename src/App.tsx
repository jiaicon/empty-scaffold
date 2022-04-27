import React, { Suspense } from "react";
import RouteConfig from "./Route/config";
import Route from "./Route";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div />}>
        <Route children={RouteConfig} />
      </Suspense>
    </BrowserRouter>
  );
};

export default App;