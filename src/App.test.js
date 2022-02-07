import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import App from "./components/App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import middleware from "./middleware";

const server = setupServer(
  rest.get(
    "https://front-end-task-dot-result-analytics-dot-fpls-dev.uc.r.appspot.com/api/v1/public/task_templates",
    (req, res, ctx) => {
      return res(
        ctx.json([
          {
            category: ["Health", "E-commerce", "Education"],
            created: "2022-02-07T15:57:21.618675",
            description: "ullamco velit culpa aliquip tempor",
            link: "https://formpl.us/templates",
            name: "dolore cupidatat veniam,",
          },
          {
            category: ["E-commerce", "Education"],
            created: "2022-02-07T20:35:19.472096",
            description: "voluptate pariatur. irure amet, tempor",
            link: "https://formpl.us/templates",
            name: "mollit incididunt pariatur.",
          },
        ])
      );
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const store = createStore(reducer, middleware);

test("renders loading screen, waiting for data", async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const loading = await screen.getByText(
    /please wait loading some data\.\.\./i
  );
  expect(loading).toBeInTheDocument();
  await waitFor(() => screen.getByTestId("tada"));

  expect(screen.getByTestId("tada")).toHaveTextContent(
    "Tada! Get started with a free template. Can't find what you are looking for? Search from the 1000+ available templates"
  );
});

test("search through the list", async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  userEvent.type(screen.getByRole("textbox"), "dolore cupidatat veniam");
  expect(screen.getByText(/1 templates/i)).toBeInTheDocument();
  expect(screen.getByText(/All templates/i)).toBeInTheDocument();
});
