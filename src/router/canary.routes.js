import { Layout, List } from "@/views/canary";

export default {
  path: "/canary",
  component: Layout,
  children: [{ path: "", component: List }],
};
