const prefix = 'ww_'

function getKey(key: string) {
  return prefix + key
}

function setItem(key: string, value: any) {
  localStorage.setItem(getKey(key), value?.toString())
}

function getItem(key: string) {
  return localStorage.getItem(getKey(key)) || ''
}

function removeItem(key: string) {
  localStorage.removeItem(getKey(key))
}

function clear() {
  localStorage.clear()
}

export const LocalStorage = {
  setItem,
  getItem,
  removeItem,
  clear,
  getKey
}
