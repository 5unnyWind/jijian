// 保存数据到localStorage，并设置过期时间为次日凌晨0点
export function setTodayItem(value: any) {
  if (typeof window === "undefined") return;
  const now = new Date();
  // 设置过期日期为当前日期的次日
  const tomorrow = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1
  );
  const expiration = tomorrow.getTime(); // 过期时间的时间戳

  const item = {
    ...value,
    expiration: expiration,
  };
  localStorage.setItem("today_item", JSON.stringify(item));
}

// 从localStorage获取数据，检查是否过期
export function getTodayItem() {
  if (typeof window === "undefined") return;
  const itemStr = localStorage.getItem("today_item");
  if (!itemStr) {
    return null;
  }

  const item = JSON.parse(itemStr);
  const now = Date.now();

  if (now > item.expiration) {
    localStorage.removeItem("today_item"); // 如果数据过期，从localStorage中移除
    return null;
  }
  return item;
}
