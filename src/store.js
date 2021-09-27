import { computed, reactive } from 'vue';

const isBoolean = val => 'boolean' === typeof val;

const ls = window.localStorage;

// keep the state object private so that we can have shared state across components!
const state = reactive({
  appTheme: 'dark',
  startTime: null,
  openTimes: 1,
  total: 0,
  pause:false
});

export const useStore = () => {
  // getters -- readonly
  const getAppTheme = computed(() => state.appTheme);
  const getStartTime = computed(() => state.startTime);
  const getOpenTimes = computed(() => state.openTimes);
  const getTotal = computed(() => state.total);
  const getPause = computed(() => state.pause);

  //actions
  const addOpenTimes = () => {
    setState('openTimes',state.openTimes+1,true)
  }

  const addTotal = () => {
    setState('total',state.total + 1,true)
  }

  const initState = () => {
    setState('startTime', new Date().getTime(), true);
    setState('openTimes', 1, true);
    setState('total', 0, true);
  }

  /**
   * Sets the value of a specific state key. Can optionally also update localStorage
   * @param {String} key - The name of the state key.
   * @param {(Boolean|Number|String)} val - The new value for the specified key.
   * @param {Boolean} ls - Controls whether or not to write the state update into localStorage.
   */
  const setState = (key, val, ls) => {
    state[key] = val;
    if (ls) writeStateToLS(key, val); // save key to LS as well
  }

  const readStateFromLS = (storedKeys) => {
    storedKeys.forEach((sKey) => {
      let stored = ls.getItem(sKey);
      let storedState = JSON.parse(stored);

      if (storedState && sKey in state) {
        state[sKey] = storedState;
      }
    });
  }

  /**
   * Updates information stored in localStorage. Can be used to update all state keys (no params) or to update a single key.
   * Can be used with or without an updated value when updating a single key.
   * @param {String} [targetKey] - The state key to write to localStorage.
   * @param {(Boolean|Number|Task[]|String)} [update] - The updated value for the specified key.
   */
  const writeStateToLS = (targetKey, update) => {
    if (update || isBoolean(update) || typeof update == 'number') {
      ls.setItem(targetKey, JSON.stringify(update));
    } else if (targetKey) {
      ls.setItem(targetKey, JSON.stringify(state[targetKey]));
    } else {
      Object.keys(state).map(key => {
        ls.setItem(key, JSON.stringify(state[key]));
      });
    }
  }

  return {
    appTheme: getAppTheme,
    startTime: getStartTime,
    openTimes: getOpenTimes,
    total: getTotal,
    pause: getPause,
    initState,
    addTotal,
    addOpenTimes,
    readStateFromLS,
    setState,
    writeStateToLS
  }
}