import type { Preview } from "@storybook/react";
import "../src/index.css"
import React from "react";
import { RouterProvider, createMemoryHistory, createRootRoute, createRouter } from "@tanstack/react-router";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => {
      return <RouterProvider router={createRouter({
        history: createMemoryHistory(),
        routeTree: createRootRoute({
          component: Story
        })
      })} />
    }
  ]
};

export default preview;

