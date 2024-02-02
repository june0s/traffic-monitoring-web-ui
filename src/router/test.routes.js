import { Layout, List } from "@/views/test";

export default {
  path: "/test",
  component: Layout,
  children: [{ path: "", component: List }],
};
