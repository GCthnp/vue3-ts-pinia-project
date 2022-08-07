<template>
  <div class="left-box-card">
    <section>
      <div>较上日+
        <countTo :startVal='0' :endVal='200' :duration='500'></countTo>

      </div>

      <div>
        {{ covidInfoStore.chinaTotal.localConfirm }}

      </div>

      <div>本土现有确诊</div>
    </section>
    <section>
      <div>较上日+

        {{ covidInfoStore.chinaAdd.nowConfirm }}
      </div>
      <div>
        {{ covidInfoStore.chinaTotal.nowConfirm }}

      </div>
      <div>现有确诊</div>
    </section>
    <section>
      <div>较上日+ {{ covidInfoStore.chinaAdd.confirm }}</div>
      <div>{{ covidInfoStore.chinaTotal.confirm }}</div>
      <div>累计确诊</div>
    </section>
    <section>
      <div>较上日+ {{ covidInfoStore.chinaAdd.noInfect }}</div>
      <div>{{ covidInfoStore.chinaTotal.noInfect }}</div>
      <div>无症状感染者</div>
    </section>
    <section>
      <div>较上日+ {{ covidInfoStore.chinaAdd.importedCase }}</div>
      <div>{{ covidInfoStore.chinaTotal.importedCase }}</div>
      <div>境外输入</div>
    </section>
    <section>
      <div>较上日+ {{ covidInfoStore.chinaAdd.dead }}</div>
      <div>{{ covidInfoStore.chinaTotal.dead }}</div>
      <div>累计死亡</div>
    </section>
  </div>
</template>
<script setup lang='ts'>
import { useCovidInfoStore } from "@/stores/userInfo"


const covidInfoStore = useCovidInfoStore()
</script>
<style scoped lang="less">
@itemColor: #41b0db;
@itemBg: #223651;
@itemBorder: #212028;

.left-box-card {
  flex: 1;
  // height: 224px;
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto auto;
  color: #fff;

  section {
    background: @itemBg;
    border: 1px solid @itemBorder;
    padding: 10px;
    display: flex;
    flex-direction: column;
    font-size: 12px;

    align-items: center;

    div:nth-child(2) {
      color: @itemColor;
      padding: 10px 0;
      font-size: 14px;
      font-weight: bold;
    }
  }
}
</style>