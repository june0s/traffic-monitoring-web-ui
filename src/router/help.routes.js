import { Layout, List } from "@/views/help";

export default {
  path: "/help",
  component: Layout,
  children: [{ path: "", component: List }],
};
