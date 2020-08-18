import renderer, { tsx, create, dom, destroy } from "@dojo/framework/core/vdom";
import icache from "@dojo/framework/core/middleware/icache";
import theme from "@dojo/framework/core/middleware/theme";
import * as React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import Button from "@material-ui/core/Button";
import dojo from "@dojo/widgets/theme/dojo";
import DojoButton from "@dojo/widgets/button";

const App = create({ icache, destroy, theme })(function App({
  middleware: { icache, destroy, theme },
}) {
  const reactButtonRoot = icache.getOrSet(
    "react",
    document.createElement("div")
  );
  destroy(() => {
    unmountComponentAtNode(reactButtonRoot);
  });
  theme.set(dojo);
  return (
    <div>
      {dom({
        node: reactButtonRoot,
        onAttach: () => {
          render(
            React.createElement(
              Button,
              {
                variant: "contained",
                color: "primary",
              },
              ["React Button"]
            ),
            reactButtonRoot
          );
        },
      })}
      <DojoButton>Dojo Button</DojoButton>
    </div>
  );
});

const r = renderer(() => <App />);
r.mount();
