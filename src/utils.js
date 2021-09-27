import { useStore } from './store.js';

const { appTheme } = useStore();

export const applyTheme = (theme) => {
  if (appTheme.value) {
    document.documentElement.setAttribute('data-theme', theme);
  }
}

export const formatTime = (input) => {

  let seconds = input
  let str = ''

  let ys = 0
  if(seconds > (86400 * 365)){
    ys = seconds / (86400 * 365);
    ys = ys.toString().split('.')[0];
    seconds = ys ? (seconds % (86400*350)) : seconds
  }

  let ds = 0
  if(seconds > 86400){
    ds = seconds / 86400;
    ds = ds.toString().split('.')[0];
    seconds = ds ? (seconds % 86400) : seconds
  }

  let hrs = 0;
  if(seconds > 3600){
    hrs = seconds / 3600;
    hrs = hrs.toString().split('.')[0];
    seconds = hrs ? (seconds % 3600) : seconds
  }
  
  let min = 0;
  if(seconds > 60){
    min = seconds / 60;
    min = min.toString().split('.')[0];
    seconds = min ? (seconds % 60) : seconds
  }

  let sec = seconds

  if(ys >= 1){
    str += (ys + 'y ')
  }
  if(ds >= 1){
    str += (ds + 'd ')
  }else if(ys >= 1){
    str += '0d '
  }
  if(hrs >= 1){
    str += `${(hrs < 10 ? '0' : '') + hrs}:${(min < 10 ? '0' : '') + min}:${(sec < 10 ? '0' : '') + sec}`
  }else{
    if(ys >= 1 || ds >= 1){
      str += '00:'
    }
    str += `${(min < 10 ? '0' : '') + min}:${(sec < 10 ? '0' : '') + sec}`
  }

  ys = null
  ds = null
  hrs = null
  min = null
  sec = null

  return str
}