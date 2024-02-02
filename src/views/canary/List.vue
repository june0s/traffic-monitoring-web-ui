<template>
  <h1>카나리 배포</h1>
  <select id="selectbox" name="selectbox"
          @change="nsItemChange($event)" class="form-select pt-1 mt-4" style="height: 33px; width: 40%; vertical-align: middle">
    <option selected>1. 네임스페이스를 선택해주세요.</option>
    <template v-for="ns in namespaces" :key="ns">
      <option>{{ ns }}</option>
    </template>
  </select>

  <template v-if="services.length > 0">
    <select id="svc-selectbox" name="svc-selectbox"
            @change="svcItemChange($event)" class="form-select pt-1 mt-4" style="height: 33px; width: 40%; vertical-align: middle">
      <option selected>2. 워크로드 서비스를 선택해주세요.</option>
      <template v-for="svc in services" :key="svc">
        <option>{{svc}}</option>
      </template>
    </select>
  </template>
<!--  <br />-->
<!--  <div>action show = {{actionShow}} , url = {{actionUrl}}</div>-->

  <br />
  <template v-if="actionUrl != null && actionShow">
    <br />
    <div>3. 우측 상단 Actions > Traffic Shifting 버튼을 클릭하면 카나리 배포 테스트를 할 수 있습니다.</div>
    <iframe id="canary-iframe" :key="actionUrl" :src="actionUrl" height="900" width="1200"></iframe>
  </template>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useCanaryStore } from "@/stores";

const canaryStore = useCanaryStore();
const { namespaces, services, actionUrl, actionShow } = storeToRefs(canaryStore);

onMounted(() => {
  console.log("canary>List.vue onMounted()");
  fetchData();
});

const fetchData = () => {
  canaryStore.getNamespaces();
};

// 네임스페이스 선택함
const nsItemChange = () => {
  var value = event.target.value
  console.log("selected namespace = " + value)
  // 해당 네임스페이스 서비스 목록 가져오기
  canaryStore.getServices(value)
};
// 서비스 선택함 ->
const svcItemChange = () => {
  var value = event.target.value
  console.log("selected service = " + value)
  canaryStore.updateActionUrl(value)
}
</script>
