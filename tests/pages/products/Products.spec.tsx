import Products from "@/app/products/page";
import { render, screen } from "@testing-library/react";
import { setupServer } from "msw/node";
import mockRouter from "next-router-mock";
import { http } from "msw";
import { env } from "@/config/env";

jest.mock("next/navigation", () => require("next-router-mock"));
const server = setupServer(
  http.get(`${env.apiBaseUrl}/produto/1`, () => {
    return Response.json({
      produtos: {
        id: 1,
        descricao: "Bolacha",
        marca: "Trakinas",
        valor: 1.99,
        peso_gramas: 100,
        sabor: "morango",
      },
    });
  })
);

describe("Products list Page", () => {
  beforeAll(() => {
    mockRouter.setCurrentUrl("/products");
    server.listen();
  });
  afterAll(() => {
    server.close();
  });
  it("should render product list", async () => {
    render(<Products />);

    screen.getByTestId("productList");

    await screen.findByRole("cell", {
      name: "Trakinas",
    });

    screen.logTestingPlaygroundURL();
  });
});
