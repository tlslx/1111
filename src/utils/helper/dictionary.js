/*
 * updated by zhangwenqi
 * -------------------------------------------------
 * 工具类:
 * 字典类, 存储键值对
 */

import $http from '@/scripts/framework/http';
// import Utility from '@/scripts/framework/utility';
let dictionary = {
  getDictionary: catalog => {
    if (!catalog) {
      kindo.util.alert('key 为空, 无法获取字典值', '提示', 'warning');
      return [];
    } else {
      let dictInfo = kindo.cache.get('dictInfo') || {};
      const dictitem = dictInfo[catalog];
      if (dictitem && dictitem.length) {
        return dictitem;
      } else {
        let queryDictPara = { 
          dictCode: catalog
        };
        return $http.get(kindo.config.api.upms + '/api/sysDataDictItem/findDicItemList', queryDictPara).then(res => {
          let diclist = [];
          let newdict = kindo.cache.get('dictInfo') || {};
          res.records.forEach(item => {
            let i18n = '';
            item.i18nList.forEach(i => {
              if (i.i18nLanguage === 'EN') {
                i18n = i.i18nValue;
              }
            });
            diclist.push({ id: item.dataDictItemId, label: item.itemText, value: item.itemCode, ename: i18n });
          });
          newdict[catalog] = diclist;
          kindo.cache.set('dictInfo', newdict, 'local');
          return diclist;
        });
      }
    }
  },

  getOpenDictionary: dicKey => {
    if (!dicKey) {
      kindo.util.alert('key 为空, 无法获取字典值', '提示', 'warning');
      return [];
    } else {
      let dictInfo = kindo.cache.get('openDictInfo') || {};
      const dictitem = dictInfo[dicKey];
      if (dictitem && dictitem.length) {
        return dictitem;
      } else {
        let queryDictPara = { 
          dictCode: dicKey
        };
        return $http.get(kindo.config.api.upms + '/api/common/dicItem/findList', queryDictPara).then(res => {
          let diclist = [];
          let newdict = kindo.cache.get('openDictInfo') || {};
          if (res && res.length > 0) {
            res.forEach(item => {
              diclist.push({ id: item.dataDictItemId, label: item.itemText, value: item.itemCode, dataDictItemParentId: item.dataDictItemParentId });
            });
          }
          newdict[dicKey] = diclist;
          kindo.cache.set('openDictInfo', newdict, 'openLocal');
          return diclist;
        });
      }
    }
  },

  getItem: (source, value) => {
    const newitem = source.filter(item => item.value === value);
    if (newitem.length === 0) {
      kindo.util.alert('key 为空, 无法获取字典值', '提示', 'warning');
      return [];
    } else {
      let dictInfo = kindo.cache.get('dictItem') || {};
      let itemid = newitem[0].id;
      const dictitem = dictInfo[itemid];
      if (dictitem && dictitem.length) {
        return dictitem;
      } else {
        let queryDictPara = { 
          dataDictItemId: itemid
        };
        return $http.get(kindo.config.api.upms + '/api/sysDataDictItem/getChildDicItemList', queryDictPara).then(res => {
          let diclist = [];
          let newdict = kindo.cache.get('dictItem') || {};
          res.records.forEach(item => {
            diclist.push({ id: item.dataDictItemId, label: item.itemText, value: item.itemCode });
          });
          newdict[itemid] = diclist;
          kindo.cache.set('dictItem', newdict, 'local');
          return diclist;
        });
      }
    }
  },

  getLabel: (source, value) => {
    if (source == null || source === undefined) {
      return value;
    } else if (value == null || value === undefined) {
      return '';
    } else if (value === '') {
      return '';
    }
    try {
      const newitem = source.filter(item => item.value === value || item.value === value.toString());
      if (newitem.length > 0) {
        return newitem[0].label;
      }
    } catch (e) {
      return '';
    } 

    return '';
  },

  getValue: (source, label) => {
    const newitem = source.filter(item => item.label === label);
    if (newitem.length > 0) {
      return newitem[0].value;
    }

    return '';
  }
};
dictionary.get = dictionary.getDictionary;
dictionary.getOpen = dictionary.getOpenDictionary;
export default dictionary;
