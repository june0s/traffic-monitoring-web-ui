<template>
  <h1>워크로드 모니터링</h1>
  <select id="selectbox" name="selectbox"
          @change="nsItemChange($event)" class="form-select pt-1 mt-4" style="height: 33px; width: 40%; vertical-align: middle">
    <option selected>1. 네임스페이스를 선택해주세요.</option>
    <template v-for="ns in namespaces" :key="ns">
      <option>{{ ns }}</option>
    </template>
  </select>

  <template v-if="workloads.length > 0">
    <select id="svc-selectbox" name="svc-selectbox"
            @change="svcItemChange($event)" class="form-select pt-1 mt-4" style="height: 33px; width: 40%; vertical-align: middle">
      <option selected>2. 워크로드를 선택해주세요.</option>
      <template v-for="svc in workloads" :key="svc">
        <option>{{svc}}</option>
      </template>
    </select>
  </template>
<!--  <br />-->
<!--  <div>action show = {{actionShow}} , url = {{actionUrl}}</div>-->

  <br />
  <template v-if="actionUrl != null && actionShow">
    <br />
    <div>상단 탭에서 로그, 메트릭 정보 등 워크로드 상태를 관찰 해보세요.</div>
    <iframe id="canary-iframe" :key="actionUrl" :src="actionUrl" height="900" width="1200"></iframe>
  </template>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useMonitoringStore } from "@/stores";

const monitoringStore = useMonitoringStore();
const { namespaces, workloads, actionUrl, actionShow } = storeToRefs(monitoringStore);

onMounted(() => {
  console.log("monitoring>List.vue onMounted()");
  fetchData();
});

const fetchData = () => {
  monitoringStore.getNamespaces();
};

// 네임스페이스 선택함
const nsItemChange = () => {
  var value = event.target.value
  console.log("selected namespace = " + value)
  // 해당 네임스페이스 서비스 목록 가져오기
  monitoringStore.getWorkloads(value)
};
// 서비스 선택함 ->
const svcItemChange = () => {
  var value = event.target.value
  console.log("selected service = " + value)
  monitoringStore.updateActionUrl(value)
}
</script>
