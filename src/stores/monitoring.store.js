import { defineStore } from "pinia";
import { fetchWrapper } from "@/helpers";
import { useAlertStore } from "@/stores";

const apiUrl = `${import.meta.env.VITE_API_URL}`;
const kialiUrl = `${import.meta.env.VITE_KIALI_URL}`;

export const useMonitoringStore = defineStore({
  id: "monitoring",
  state: () => ({
    namespaces: {},
    workloads: {},
    actionUrl: null,
    actionShow: false
  }),
  actions: {
    async getNamespaces() {
      console.log("getNamespaces call!")
      this.namespaces = {loading: true};
      this.actionShow = false
      this.actionUrl = null
      try {
        var response = await fetchWrapper.get(`${apiUrl}/namespaces`)
        console.log("code = " + response.code)
        if (response.code == 200) {
          this.namespaces = response.data.namespaces
        }
        console.log("namespaces = " + this.namespaces)
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
        this.namespaces = {error};
        console.log(this.namespaces)
        throw error;
      }
    },
    async getWorkloads(namespace) {
      console.log("getWorkloads call!")
      this.workloads = {loading: true};
      this.actionShow = false
      this.actionUrl = null
      try {
        var response = await  fetchWrapper.get(`${apiUrl}/${namespace}/workloads`);
        if (response.code == 200) {
          console.log("namespace = " + namespace)
          this.workloads = response.data.workloads
          this.actionUrl = `${kialiUrl}/namespaces/${namespace}/workloads/`
        }
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
        this.workloads = {error};
        console.log(this.workloads)
        throw error;
      }
    },
    async updateActionUrl(service) {
      console.log("updateActionUrl call!")
      this.actionShow = true
      this.actionUrl += service
      // duration =
      // refresh =
      // rangeDuration =
      this.actionUrl += "?duration=300&refresh=15000&tab=in_metrics&rangeDuration=86400&kiosk=true"
      console.log("action url = " + this.actionUrl)
    }
  },
});
