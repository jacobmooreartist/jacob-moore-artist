import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/editions")({
  beforeLoad: () => {
    throw redirect({ to: "/gallery", replace: true });
  },
});
