<script>
import BtnSwitchTheme from './components/button/BtnSwitchTheme.vue';
import BtnReset from './components/button/BtnReset.vue';

import { computed, onMounted,onBeforeUnmount,watch } from 'vue';
import { useStore } from './store.js';
import { applyTheme, formatTime } from './utils.js';

export default {
  name: 'App',
  components: {
    BtnSwitchTheme,
    BtnReset
  },
  setup() {
    const { appTheme,total,openTimes,startTime,pause, setState,readStateFromLS, addTotal, addOpenTimes } = useStore();
    if(!startTime.value){
      console.log('not start time')
      setState('startTime',new Date().getTime())
    }

    console.log('add open times',openTimes.value)
    
    const totalDisplay = computed(() => { return formatTime(total.value) });
    const startDisplay = computed(() => { return new Date(startTime.value) });

    let timer = 0
    const startTimerWork = ()=>{
      clearInterval(timer)
      timer = setInterval(()=>{
        addTotal()
      },1000)
    }

    const stopTimerWork = ()=>{
      clearInterval(timer)
    }

    watch(pause, () => {
      if (!pause.value) {
        startTimerWork();
      } else {
        stopTimerWork();
      }
    })

    onMounted(() => {
      const appNode = document.getElementById('app');
      appNode.style.opacity = '1';
      appNode.style.transition = 'opacity 1.5s ease';

      setTimeout(readStateFromLS(['appTheme', 'startTime', 'openTimes', 'total']), 50);
      setTimeout(applyTheme(appTheme.value), 150);

      startTimerWork()
      addOpenTimes()
    })

    onBeforeUnmount(()=>{
      stopTimerWork()
    })

    return {
      appTheme,
      totalDisplay,
      openTimes,
      startDisplay
    }
  }
}
</script>

<template>
  <p class="text-lg tracking-wide text-gray-dark text-center mt-8 mb-12 md:my-12">How long does this page show.</p>
  <section class="my-12">
    <p class="text-center text-base font-bold tracking-wide text-gray-dark">Total Time</p>
    <p class="text-center text-2xl font-bold tracking-wide text-gray-dark">{{ totalDisplay }}</p>
  </section>
  <section class="my-12">
    <p class="text-center text-base font-bold tracking-wide text-gray-dark">Open Times</p>
    <p class="text-center text-2xl font-bold tracking-wide text-gray-dark oldstyle-nums">{{ openTimes }}</p>
  </section>
  <section class="my-12">
    <p class="text-center text-base font-bold tracking-wide text-gray-dark">Start Time</p>
    <p class="text-center text-base font-bold tracking-wide text-gray-dark">{{ startDisplay }}</p>
  </section>
  <BtnSwitchTheme />
  <BtnReset />
</template>