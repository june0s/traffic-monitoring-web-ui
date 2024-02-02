import { defineStore } from "pinia";
import { fetchWrapper } from "@/helpers";
import { useAlertStore } from "@/stores";

const apiUrl = `${import.meta.env.VITE_API_URL}`;
const kialiUrl = `${import.meta.env.VITE_KIALI_URL}`;

export const useCanaryStore = defineStore({
  id: "canary",
  state: () => ({
    namespaces: {},
    services: {},
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
    async getServices(namespace) {
      console.log("getServices call!")
      this.services = {loading: true};
      this.actionShow = false
      this.actionUrl = null
      try {
        var response = await  fetchWrapper.get(`${apiUrl}/${namespace}/services`);
        if (response.code == 200) {
          console.log("namespace = " + namespace)
          this.services = response.data.services
          this.actionUrl = `${kialiUrl}/namespaces/${namespace}/services/`
        }
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
        this.services = {error};
        console.log(this.services)
        throw error;
      }
    },
    async updateActionUrl(service) {
      console.log("updateActionUrl call!")
      this.actionShow = true
      this.actionUrl += service
      console.log("action url = " + this.actionUrl)
    }
  },
});
