import { Layout, List } from "@/views/monitoring";

export default {
  path: "/monitoring",
  component: Layout,
  children: [{ path: "", component: List }],
};
