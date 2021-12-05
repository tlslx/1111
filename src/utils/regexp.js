/**
 * @overview 正则相关工具类，包括验证规则等
 * @auther ycliuj
 * @version 1.0
 * 
 * 
 * usage:
 * 		import { validateRules } from '@/utils/regexp'
 * 
 * 		例如：
 * 			validateRules.CN_NAME_RULE
 */

export const validateRules = {
  // 必须包含汉字，但是不能存在半角括号  适用： 企业中文名称
  CN_NAME_RULE: /^([^(){}]+)?[\u4e00-\u9fa5]+([^(){}]+)?$/,
  // 不允许汉字及中文标点符号、全角符号，首位不能为空字符（此处取反即可，即只要是非空的ASCII字符都可以） 适用：企业英文名称
  EN_NAME_RULE: /^[^\s][^\u4E00-\u9FA5\uFE30-\uFFA0\u3001-\u3015\u2012-\u2026]+$/,
  // 不允许汉字, 首位不能为空字符
  NO_CN_RULE: /[^\s][^\u4e00-\u9fa5]/gm,
  // 必须包含汉字，可以包含换行符
  CONTAIN_CN: /.*[\u4e00-\u9fa5]+\r*.*/gm

};
