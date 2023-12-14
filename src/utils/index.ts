/**
 * 工具函数封装
 */

//格式化金额
export const formatMoney = (num: number | string) => {
  const a = parseFloat(num.toString());
  //number.toLocaleString()  用于金额格式化
  return a.toLocaleString('zh-CN',{style:'currency',currency:"CNY"})

}

//格式化日期
export const formatDate = (date?: Date,rule?:string) => {
  let curDate = new Date()
  if (date) curDate = date;
  if (rule === "yyyy-MM-dd") return curDate.toLocaleDateString();
  if (rule === "HH:mm:ss") return curDate.toLocaleTimeString();
  return curDate.toLocaleString
}

