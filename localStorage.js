export function checkNullLocalStorage(item) {
  const getItem = localStorage.getItem(item) === null;
  return getItem;
}

export function setItemLocalStorage(key, value) {
  if (!checkNullLocalStorage(key)) {
    console.log("Такой ключ уже есть. Перезаписываю данные");
    localStorage.setItem(key, JSON.stringify(value));
    return;
  }
  localStorage.setItem(key, JSON.stringify(value));
  console.log("Создан новый ключ");
}

export function getItemLocalStorage(key) {
  if (checkNullLocalStorage(key)) {
    console.log("Такого ключа нет");
    return null;
  }
  const item = localStorage.getItem(key);
  try {
    const keyParse = JSON.parse(item);
    return keyParse;
  } catch (error) {
    console.error(error);
  }
}

export function showLocalStotage() {
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    console.log(`${key} - ${localStorage.getItem(key)}`);
  }
}
