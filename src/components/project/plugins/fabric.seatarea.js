/**
 * extends of fabric for online distribution of  exhibition position
 **/

/**
 * basic settings of fabric.Object
 **/
fabric.Object.prototype.hasBorders = false; //去掉边框
fabric.Object.prototype.hasControls = false; //去掉控制
fabric.Object.prototype.lockMovementX = true; //横行移动锁定
fabric.Object.prototype.lockMovementY = true; //纵向移动锁定

/**
 * const
 **/

const MARK_LINE_WIDTH = 2; // 展位分配企业后标记的线段宽度
const MARK_LINE_DISTANCE = 4; // 展位分配企业后线段与展位开口边的距离
const LINE_DASH = [2, 2];
const MODEL_KEY_MAP = {
  '2': 'exhibitIdOneName',
  '4': 'exhibitIdTwoName',
  '6': 'businessDelegation'
};
const QUADRANT_SYMBOL = {
  t: [{ x: -1, y: -1 }, { x: 1, y: -1 }],
  r: [{ x: 1, y: -1 }, { x: 1, y: 1 }],
  b: [{ x: 1, y: 1 }, { x: -1, y: 1 }],
  l: [{ x: -1, y: 1 }, { x: -1, y: -1 }]
};

// 展厅图边框与整个canvas边框之间的距离
const [OFFSET_WIDTH, OFFSET_HEIGHT] = [80, 75];
//展示模式
const SHOW_COMPANY_NAME = 1; // 企业名称,默认
/*
const SHOW_MAIN_PRODUCT = 2; // 主营产品
const SHOW_LEVEL_ONE = 3; // 一级展品
const SHOW_LEVEL_TWO = 4; // 二级展品
const SHOW_LEVEL_THREE = 5; // 三级展品
const SHOW_BUSINESS = 6; // 交易团
//展位各个状态下的填充颜色
*/
const COLOR_DEFAULT = 'white'; //默认
const COLOR_SELECTED = 'lightblue'; // 选中
const COLOR_PLANED = 'yellow'; // 分配企业
const COLOR_PLANED_SELECTED = 'blue'; //分配企业选中
const COLOR_FILTER = 'green'; // 展位筛选
const COLOR_CONFLICT = 'red'; // 冲突
const COLOR_DISABLED = '#e4e4e4'; // 不可操作
const EXPEXCT_COLOR = ['#00F5FF', '#ffffff', '#000000'];

const SHOW_PLANED_MODEL_ONE = 1;
const SHOW_PLANED_MODEL_TWO = 2;

// 校验规则
const INSPECTION_RULES = {
  less: {
    violation: "展位数少于推荐数",
    type: "非严禁类规则",
    state: 1,
    violate: false
  }, // 少于推荐展位
  more: {
    violation: "展位数大于推荐数",
    type: "严禁类规则",
    state: 2,
    violate: false
  }, // 大于推荐展位
  repeat: {
    violation: "展位安排重复",
    type: "严禁类规则",
    state: 2,
    violate: false
  }, // 重复安排
  pubnish: {
    violation: "展位安排是否符合企业奖惩名单",
    type: "非严禁类规则",
    state: 1,
    violate: false
  }, // 奖惩处理名单
  exception: {
    violation: "展位安排异常",
    type: "非严禁类规则",
    state: 1,
    violate: false
  }, // 异常安排
  exceptionIsland: {
    violation: "岛型展位安排两家或以上企业",
    type: "非严禁类规则",
    state: 1,
    violate: false
  },
  exceptionNotAdjacent: {
    violation: "展位物理位置不相邻",
    type: "严禁类规则",
    state: 2,
    violate: false
  },
  exceptionNumLimit: {
    violation: "企业品牌展位数不符合展区展位上下限",
    type: "严禁类规则",
    state: 2,
    violate: false
  },
  withdraw: {
    violation: "撤展回旋区不得安排特装（含品牌）展位企业",
    type: "严禁类规则",
    state: 2,
    violate: false
  }, // 撤展回旋展区
  enterprise: {
    violation: "专区企业安排与预设企业不一致",
    type: "非严禁类规则",
    state: 1,
    violate: false
  }, // 专区企业安排情况
  channel: {
    violation: "主副通道企业安排不合理",
    type: "其他",
    state: 3,
    violate: false
  }, // 主副通道安排
  adhesion: {
    violation: "企业安排品牌粘连",
    type: "非严禁类规则",
    state: 1,
    violate: false
  }, // 品牌粘连
  specialArea: {
    violation: "安排专区与预设专区不一致",
    type: "非严禁类规则",
    state: 1,
    violate: false
  } // 品牌粘连
};

// 图例相关
const LEGEND_WIDTH = 30;
const LEGEND_HEIGHT = 14;

/**
 * variable
 **/
let lastPoint = new fabric.Point(0, 0);
let colorGroups = {
  exhibitIdOneName: {},
  exhibitIdTwoName: {},
  businessDelegation: {}
};
let schemaInfo = {};
let facilityIcons = {};
/**
 *  methods
 **/

//随机生成16进制的颜色
const randomColor = () => {
  const arrNum = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
  let [random, str] = [0, '#'];
  for (let i = 0; i < 6; i++) {
    random = Math.floor(Math.random() * 16);
    str += arrNum[random];
  }
  if (EXPEXCT_COLOR.includes(str.toLowerCase()) || EXPEXCT_COLOR.includes(str.toUpperCase())) {
    str = randomColor();
  }
  return str;
};

const assignColors = (enterprise) => {
  Object.keys(colorGroups).forEach((key) => {
    if (Object.keys(colorGroups[key]).indexOf(enterprise[key]) === -1) {
      colorGroups[key][enterprise[key]] = randomColor();
    }
  });
};

const addRules = (canvas, companyId, exhibitions, rule) => {
  let rules = canvas.ruleRelatedData.violateRuleList[companyId];
  !rules && (rules = {});
  rules[rule] || (rules[rule] = Object.assign({}, INSPECTION_RULES[rule]));
  if (!rules[rule].boothCode) {
    rules[rule].boothCode = exhibitions.map(exhibition => exhibition.code).join(',');
  } else {
    rules[rule].boothCode += "," + exhibitions.map(exhibition => exhibition.code).join(',');
  }
  canvas.ruleRelatedData.violateRuleList[companyId] = rules;
  exhibitions.forEach(item => {
    let violateRules = item.get('violateRules');
    violateRules || (violateRules = {});
    violateRules[rule] || (violateRules[rule] = INSPECTION_RULES[rule]);
    item.set('violateRules', violateRules);
  });
};

const remove = (canvas, companyId, exhibitions, rules) => {
  let violationRules = canvas.ruleRelatedData.violateRuleList[companyId];
  violationRules && rules.forEach(item => delete violationRules[item]);
  canvas.ruleRelatedData.violateRuleList[companyId] = violationRules;
  exhibitions.forEach(item => {
    const violateRules = item.get('violateRules');
    violateRules && rules.forEach(rule => {
      violateRules[rule] && delete violateRules[rule];
    });
    item.set('violateRules', violateRules);
  });
};

//移动到指定坐标
const moveTo = (ctx, x, y) => {
  ctx.moveTo(x, y);
  lastPoint.setXY(x, y);
};

//划线,配合moveTo方法使用,(x, y)为相对坐标
// openDirection 线段的指向
// openNum 开口方向的数量
const lineTo = (pointTrack, ctx, x, y, openDirection, openNum) => {
  const temp = new fabric.Point(x, y);
  if (openDirection) {
    switch (openDirection) {
      case 't':
        temp.setY(temp.y - MARK_LINE_DISTANCE * openNum);
        break;
      case 'l':
        temp.setX(temp.x - MARK_LINE_DISTANCE * openNum);
        break;
      case 'b':
        temp.setY(temp.y + MARK_LINE_DISTANCE * openNum);
        break;
      default:
        temp.setX(temp.x + MARK_LINE_DISTANCE * openNum);
        break;
    }
  }
  lastPoint = lastPoint.add(temp);
  ctx.lineTo(lastPoint.x, lastPoint.y);
  pointTrack.push(lastPoint);
};

const getHallDrawData = (exhibitionHallCoordinates = []) => {
  const xArray = exhibitionHallCoordinates.map(item => item.pointX);
  const yArray = exhibitionHallCoordinates.map(item => item.pointY);
  const [xMin, xMax] = [Math.min(...xArray), Math.max(...xArray)];
  const [yMin, yMax] = [Math.min(...yArray), Math.max(...yArray)];
  return [xMin, yMax, xMax - xMin, yMax - yMin];
};

// 根据展位线性表的数据获取展位的绘制数据
const getExhibitionDrawData = (exhibitionLines, xScale, yScale, startX, startY) => {
  let xArray = exhibitionLines.map(item => item.startPointX || item.pointX).concat(exhibitionLines.map(item => item.endPointX || item.pointX));
  let yArray = exhibitionLines.map(item => item.startPointY || item.pointY).concat(exhibitionLines.map(item => item.endPointY || item.pointY));
  const [xMin, xMax] = [Math.min(...xArray), Math.max(...xArray)];
  const [yMin, yMax] = [Math.min(...yArray), Math.max(...yArray)];
  let [t, r, b, l] = ['0', '0', '0', '0'];
  exhibitionLines.forEach(item => {
    const direction = Number(item.lineType) === 2 ? '0' : '1';
    if (item.startPointX === item.endPointX) { // 左右
      item.startPointX === xMin ? (l = direction) : (r = direction);
    } else if (item.startPointY === item.endPointY) { // 上下
      item.startPointY === yMax ? (t = direction) : (b = direction);
    }
  });
  return {
    startPointX: (xMin - startX) * xScale + OFFSET_WIDTH,
    startPointY: -(yMax - startY) * yScale + OFFSET_HEIGHT,
    width: (xMax - xMin) * xScale,
    height: (yMax - yMin) * yScale,
    openDirection: [t, r, b, l]
  };
};

//获取两个方向的开口数量
const getOpenNum = (directionA, directionB) => {
  const result = Number(directionA) + Number(directionB);
  return result === 0 ? 2 : (result === 2 ? 0 : result);
};

//自定义判断两个Point是否相等
const eq4Point = (pointA, pointB) => {
  const differenceAbs = 2;
  return (pointA.x === pointB.x && Math.abs(pointA.y - pointB.y) <= differenceAbs)
    || (pointA.y === pointB.y && Math.abs(pointA.x - pointB.x) <= differenceAbs)
    || (Math.abs(pointA.x - pointB.x) <= differenceAbs && Math.abs(pointA.y - pointB.y) <= differenceAbs);
};

//判断两个展位之间的关系
const positionRelationship4Two = (exhibitionA, exhibitionB) => {
  let commonPoints = {};
  const [acoordA, acoordB] = [exhibitionA.aCoords, exhibitionB.aCoords];
  for (const keyA in acoordA) {
    const pointA = acoordA[keyA];
    for (const keyB in acoordB) {
      if (eq4Point(pointA, acoordB[keyB])) {
        commonPoints[keyA] = pointA;
        break;
      }
    }
  }
  return commonPoints;
};

// 判断展位与通道是否相邻
const isAdjacentbetweenExhibitionAndChannel = (exhibition, channel) => {
  let flag = false;
  const permitDiff = 3; // 允许误差
  const aCoords = exhibition.aCoords;
  if (channel.direction === '东西走向') { // 横向通道
    // 展位的下边靠着通道或者上边靠着
    flag = Math.abs(aCoords.br.y - channel.startPointY) < permitDiff || Math.abs(aCoords.tl.y - (channel.startPointY + channel.height)) < permitDiff;
  } else { // 纵向通道
    // // 展位的下边靠着通道或者上边靠着
    flag = Math.abs(aCoords.br.x - channel.startPointX) < permitDiff || Math.abs(aCoords.tl.x - (channel.startPointX + channel.weight)) < permitDiff;
  }
  return flag;
};

//判断两个字符串之间包含的共同字符,只返回第一个共同的字符
const commonChar4TwoStr = (strA, strB) => {
  if (typeof (strA) !== 'string' || typeof (strB) !== 'string' || !strA || !strB) {
    return '';
  }
  const arrayA = strA.split('');
  return arrayA.filter(function (char) {
    return strB.indexOf(char) !== -1;
  })[0];
};

//计算标识展位位置关系的Point中的相同x(或y)坐标相同的数量
const commonPointNum = (exhibitions, key) => {
  const coords = {};
  exhibitions.forEach((exhibition) => {
    const point = exhibition.get('positionShip');
    if (Object.keys(coords).indexOf(point[key] + '') !== -1) {
      coords[point[key]]++;
    } else {
      coords[point[key]] = 1;
    }
  });
  return coords;
};

//根据展位的开口方向判断分配企业后的开口方向,返回 t 上 r 右 b 下 l 左
const getOpenDirectionByExhibition = (openDirection) => {
  const [t, r, b, l] = openDirection;
  if ((t === r && r === b && b === l && l === '0') || (r === b && b === '0') || (l === b && b === '0')) {
    return 'b';
  } else if ((r === t && t === '0') || (l === t && t === '0')) {
    return 't';
  } else {
    return r === '0' ? 'r' : 'l';
  }
};

//获取X(或Y)最大坐标坐标的出现次数
const getKeyByMaxValue = (coords, max) => {
  let result = {
    key: '',
    num: 0
  };
  Object.keys(coords).forEach(key => {
    if (coords[key] === max) {
      result.key = key;
      result.num++;
    }
  });
  return result;
};

const getMostPointExh = (exhibitions, coords, max, key) => {
  let result = getKeyByMaxValue(coords, max);
  return exhibitions.filter((exhibition) => {
    return exhibition.get('positionShip')[key] === Number(result.key);
  })[0];
};

const dealSpecialColor4Enterprise = (enterprise, canvas) => {
  const expectColor = ['#ffffff', '#000000'];
  if (enterprise.exhibitsSpecialAreaCode) {
    if (!enterprise.exhibitsSpecialAreaColor
      || expectColor.includes(enterprise.exhibitsSpecialAreaColor.toLowerCase())) {
      const legend = canvas.specialAreaLegend[enterprise.exhibitsSpecialAreaCode];
      enterprise.exhibitsSpecialAreaColor = (legend && legend.color) || randomColor();
    }
  }
};

//为一个展位分配企业
const planEnterprise4One = (enterprise, exhibition) => {
  dealSpecialColor4Enterprise(enterprise, exhibition.canvas);
  exhibition.plan({
    num: 1,
    showModel: SHOW_COMPANY_NAME,
    planedModel: SHOW_PLANED_MODEL_ONE,
    exhibition: exhibition,
    enterprise: enterprise
  }, enterprise.exhibitsSpecialAreaColor || COLOR_PLANED);
  assignColors(enterprise);
};

//判断多个相邻展位的开口方向
const chargeOpendirection4More = (exhibitions) => {
  const xCoords = commonPointNum(exhibitions, 'x');
  const yCoords = commonPointNum(exhibitions, 'y');
  const xMax = Math.max(...Object.values(xCoords));
  const yMax = Math.max(...Object.values(yCoords));
  if (xMax > yMax) {
    const filterExhibition = getMostPointExh(exhibitions, xCoords, xMax, 'x');
    const [t, r, b, l] = filterExhibition.exhibition.openDirection;
    Boolean(b);
    if (r === '1' && l === '1') {
      return t === '0' ? 't' : 'b';
    }
    return l === '0' ? 'l' : 'r';
  } else if (xMax < yMax) {
    const filterExhibition = getMostPointExh(exhibitions, yCoords, yMax, 'y');
    const [t, r, b] = filterExhibition.exhibition.openDirection;
    if (t === '1' && b === '1') {
      return r === '0' ? 'r' : 'l';
    }
    return t === '0' ? 't' : 'b';
  } else {
    const xNum = getKeyByMaxValue(xCoords, xMax);
    const yNum = getKeyByMaxValue(yCoords, yMax);
    if (xNum.num === 1 && yNum.num === 1) {
      const filterExhibition = exhibitions.filter((exhibition) => {
        const point = exhibition.get('positionShip');
        return point.x === Number(xNum.key) && point.y === Number(yNum.key);
      })[0];
      return getOpenDirectionByExhibition(filterExhibition.exhibition.openDirection);
    } else {
      let filterExhibition = exhibitions.filter((exhibition) => {
        const point = exhibition.get('positionShip');
        return point.x === Math.min(...Object.keys(xCoords)) && point.y === Math.min(...Object.keys(yCoords));
      })[0];
      if (!filterExhibition) {
        return 'r';
      }
      let direction = getOpenDirectionByExhibition(filterExhibition.exhibition.openDirection);
      if (direction !== 't') {
        filterExhibition = exhibitions.filter((exhibition) => {
          const point = exhibition.get('positionShip');
          return point.x === Math.max(...Object.keys(xCoords)) && point.y === Math.max(...Object.keys(yCoords));
        })[0];
        let direction4Br = getOpenDirectionByExhibition(filterExhibition.exhibition.openDirection);
        if (!direction || direction4Br === 'b') {
          direction = direction4Br;
        }
      }
      return direction;
    }
  }
};

//为多个展位中与其他展位无关联的单个分配企业
const planEnterprise4Single = (enterprise, exhibitions) => {
  exhibitions.forEach(function(exhibition) {
    planEnterprise4One(enterprise, exhibition);
  });
};

//为相邻的多个展位分配企业
const planEnterprise4Relation = (enterprise, exhibitions) => {
  if (!exhibitions.length) {
    return;
  }
  dealSpecialColor4Enterprise(enterprise, exhibitions[0][0].canvas);
  exhibitions.forEach(function(exhibition) {
    const sortExhibition = exhibition.sort(function(current, next) {
      const currentPoint = current.get('positionShip');
      const nextPoint = next.get('positionShip');
      return currentPoint.y - nextPoint.y || currentPoint.x - nextPoint.x;
    });
    const openDirection = chargeOpendirection4More(sortExhibition);
    sortExhibition.forEach((object) => {
      object.plan({
        num: exhibition.length,
        showModel: SHOW_COMPANY_NAME,
        planedModel: SHOW_PLANED_MODEL_ONE,
        openDirection: openDirection,
        exhibitions: exhibition,
        enterprise: enterprise
      }, enterprise.exhibitsSpecialAreaColor || COLOR_PLANED);
    });
  });
  assignColors(enterprise);
};

const hasExhibition = (exhibitions, x, y) => {
  const point = new fabric.Point(x, y);
  return exhibitions.some((exhibition) => {
    return exhibition.get('positionShip').eq(point);
  });
};

const getPositionNum = (point, exhibitions) => {
  const positionNum = { t: 0, r: 0, b: 0, l: 0 };
  let i = 1;
  let flag = hasExhibition(exhibitions, point.x, point.y - i);
  //判断展位上方
  while (flag) {
    positionNum.t++;
    i++;
    flag = hasExhibition(exhibitions, point.x, point.y - i);
  }
  //判断展位右方
  i = 1;
  flag = hasExhibition(exhibitions, point.x + i, point.y);
  while (flag) {
    positionNum.r++;
    i++;
    flag = hasExhibition(exhibitions, point.x + i, point.y);
  }
  //判断展位下方
  i = 1;
  flag = hasExhibition(exhibitions, point.x, point.y + i);
  while (flag) {
    positionNum.b++;
    i++;
    flag = hasExhibition(exhibitions, point.x, point.y + i);
  }
  //判断展位左方
  i = 1;
  flag = hasExhibition(exhibitions, point.x - i, point.y);
  while (flag) {
    positionNum.l++;
    i++;
    flag = hasExhibition(exhibitions, point.x - i, point.y);
  }
  return positionNum;
};

//判断展位上下左右相邻的数量
const getPositionNum4Exh = (exhibition) => {
  const planInfo = exhibition.planInfo;
  const positionPoint = exhibition.get('positionShip');
  return getPositionNum(positionPoint, planInfo.exhibitions);
};

const dealWithRelations = (position) => {
  const newRelations = [];
  position.relation.forEach((itemArray) => {
    const array = [];
    itemArray.forEach((item) => {
      const positionNum = getPositionNum(item.get('positionShip'), itemArray);
      let sum = 0;
      Object.values(positionNum).forEach((value) => {
        sum += Number(value);
      });
      if (!sum) {
        position.single.push(item);
      } else {
        array.push(item);
      }
    });
    array.length && newRelations.push(array);
  });
  return newRelations;
};

//为多个展位分配企业
const planEnterprise4More = (enterprise, oldExhibitions) => {
  const position = { single: [], relation: [] };
  const length = oldExhibitions.length;
  if (!length) {
    return;
  }
  const exhibitions = oldExhibitions.sort(function(current, next) {
    const [currentTl, nextTl] = [current.aCoords.tl, next.aCoords.tl];
    return currentTl.y - nextTl.y || currentTl.x - nextTl.x;
  });
  for (let i = 0; i < length; i++) {
    const current = exhibitions[i];
    let flag = true;
    for (let j = i + 1; j < length; j++) {
      const compare = exhibitions[j];
      if (compare.get('positionShip')) {
        continue;
      }
      const result = positionRelationship4Two(current, compare);
      const keys = Object.keys(result);
      if (keys.length) {
        flag = false;
        let currentPosition = current.get('positionShip');
        if (!currentPosition) {
          currentPosition = new fabric.Point(0, 0);
          current.set('positionShip', currentPosition);
        }
        if (keys.length === 1) {
          let [y, x] = [...keys[0].split('')];
          x = x === 'r' ? (currentPosition.x + 1) : (currentPosition.x - 1);
          y = y === 'b' ? (currentPosition.y + 1) : (currentPosition.y - 1);
          compare.set('positionShip', new fabric.Point(x, y));
        } else {
          const commonChar = commonChar4TwoStr(keys[0], keys[1]);
          let [x, y] = [currentPosition.x, currentPosition.y];
          switch (commonChar) {
            case 't':
              y--;
              break;
            case 'r':
              x++;
              break;
            case 'b':
              y++;
              break;
            case 'l':
              x--;
              break;
            default:
              break;
          }
          compare.set('positionShip', new fabric.Point(x, y));
        }
        const arrayIndex = current.get("arrayIndex");
        if (arrayIndex === undefined) {
          const relationLen = position.relation.length;
          let tempArray = [];
          tempArray.push(current);
          tempArray.push(compare);
          current.set("arrayIndex", relationLen);
          compare.set("arrayIndex", relationLen);
          position.relation.push(tempArray);
        } else {
          position.relation[arrayIndex].push(compare);
          compare.set("arrayIndex", arrayIndex);
        }
      }
    }
    if (flag && !current.get('positionShip')) {
      position.single.push(current);
    }
  }

  position.relation = dealWithRelations(position);

  planEnterprise4Single(enterprise, position.single);
  planEnterprise4Relation(enterprise, position.relation);
};

//计算字体大小
const calculateFontSize = (ctx, width, text) => {
  let [textWidth, lastFontSize] = [ctx.measureText(text).width, 0];
  const difference = width - textWidth;
  let fontSize = Number(ctx.font.substr(0, ctx.font.indexOf('px')));
  if (difference > 0) {
    while (fontSize <= 12) {
      lastFontSize = fontSize;
      fontSize++;
      ctx.font = `${fontSize}px sans-serif`;
      textWidth = ctx.measureText(text).width;
      if (width - textWidth < 0) {
        break;
      }
    }
  } else if (difference < 0) {
    while (fontSize >= 6) {
      lastFontSize = fontSize;
      fontSize--;
      ctx.font = `${fontSize}px sans-serif`;
      textWidth = ctx.measureText(text).width;
      if (width - textWidth > 0) {
        break;
      }
    }
  }

  lastFontSize;
  ctx.font = `${lastFontSize}px sans-serif`;
  return lastFontSize;
};

const addBoderTrack = (pathStr, ctx, exhibition, pointTrack) => {
  let result = pathStr;
  pointTrack.forEach(function(point) {
    result += `L ${point.x} ${point.y}`;
  });
  exhibition._pathTrack(ctx, result);
};

const getExhibitionDesc = (planInfo) => {
  const enterprise = planInfo.enterprise;
  let desc = `${enterprise.enterpriseAbbreviation}`;
  if (!planInfo.exhibition || planInfo.exhibition.type !== 'island') {
    desc += `(${planInfo.num})`;
  }
 /* switch (planInfo.showModel) {
    case SHOW_COMPANY_NAME:
      desc = `${enterprise.enterpriseAbbreviation}(${planInfo.num})`;
      break;
    case SHOW_MAIN_PRODUCT:
      desc = enterprise.mainProductKeywordCh;
      break;
    case SHOW_LEVEL_ONE:
      desc = enterprise.exhibitTypeOne;
      break;
    case SHOW_LEVEL_TWO:
      desc = enterprise.exhibitTypeTwo;
      break;
    case SHOW_LEVEL_THREE:
      desc = enterprise.exhibitTypeThree;
      break;
    case SHOW_BUSINESS:
      desc = enterprise.businessDelegation;
      break;
    default:
      break;
  }*/
  return desc;
};

//将描述信息分行
const branchDescribtion = (ctx, text, openWidth) => {
  let [textWidth, i, length] = [ctx.measureText(text).width, 1, text.length];
  const textArray = [];
  while (textWidth > openWidth) {
    i++;
    let subText = text.substring(0, Math.floor(length / i));
    textWidth = ctx.measureText(subText).width;
  }
  i > 3 && (i = 3);
  if (i === 1) {
    textArray.push(text);
  } else {
    const subLength = Math.floor(length / i);
    let [j, subText] = [0, ""];
    while (j < i) {
      if (j + 1 === i) {
        subText = text.substring(subLength * j);
      } else {
        subText = text.substring(subLength * j, subLength * (j + 1));
      }

      textArray.push(subText);
      j++;
    }
  }
  return textArray;
};

//绘制品牌展位斜线(单个展位)
const drawOblique4Brand = (ctx, exhibition) => {
  if (schemaInfo.exhibitionProperty !== '品牌展位') {
    return;
  }
  ctx.save();
  ctx.lineWidth = 1;
  ctx.setLineDash(LINE_DASH);
  ctx.beginPath();
  moveTo(ctx, -exhibition.width / 2, exhibition.height / 2);
  lineTo([], ctx, exhibition.width, -exhibition.height);
  exhibition._pathTrack(ctx, `M ${-exhibition.width / 2} ${exhibition.height / 2}  l ${exhibition.width} ${-exhibition.height}`);
  ctx.stroke();
  ctx.restore();
};

//为展位添加描述信息(单个)
const drawText4SingleExhibition = (ctx, exhibition, openDirection) => {
  const planInfo = exhibition.planInfo;
  let text = getExhibitionDesc(planInfo);
  ctx.save();
  const [width, height] = [exhibition.width, exhibition.height];
  const [t, r, b, l] = exhibition.exhibition.openDirection;
  const [tbNum, lrNum] = [getOpenNum(t, b), getOpenNum(l, r)];
  let [y, rotate, fontSize, openWidth] = [0, 0, 0, 0];
  ctx.fillStyle = '#000000';
  ctx.textAlign = 'center';
  switch (openDirection) {
    case 't':
      y = -height / 2 - 2;
      openWidth = width - MARK_LINE_DISTANCE * (2 - lrNum);
      fontSize = calculateFontSize(ctx, openWidth, text);
      break;
    case 'r':
      y = -width / 2 - 2;
      openWidth = height - MARK_LINE_DISTANCE * (2 - tbNum);
      fontSize = calculateFontSize(ctx, openWidth, text);
      ctx.rotate(90 * Math.PI / 180);
      rotate = 90;
      break;
    case 'b':
      openWidth = width - MARK_LINE_DISTANCE * (2 - lrNum);
      fontSize = calculateFontSize(ctx, openWidth, text);
      y = height / 2 + fontSize + 2;
      break;
    case 'l':
      y = -width / 2 - 2;
      openWidth = height - MARK_LINE_DISTANCE * (2 - tbNum);
      fontSize = calculateFontSize(ctx, openWidth, text);
      ctx.rotate(-90 * Math.PI / 180);
      rotate = -90;
      break;
    default:
      break;
  }
  const scale = fontSize / 12;
  const textArray = branchDescribtion(ctx, text, openWidth / scale);
  ctx.scale(scale, scale);
  y = y / scale;
  textArray.forEach((item, index) => {
    const offset = (textArray.length - index - 1) * (fontSize / scale + 2);
    const yCoord = openDirection === 'b' ? y + index * (fontSize / scale + 2) : y - offset;
    ctx.fillText(item, 0, yCoord);
    exhibition._textTrack({
      'style': `font: ${ctx.font}; opacity: 1;`,
      'x': -ctx.measureText(item).width / 2,
      'y': yCoord,
      'text': item,
      'transform': `rotate(${rotate} 0,0)`
    });
  });

  ctx.restore();
};

//单个展位分配开口向上
const drawSingl4Top = (ctx, exhibition) => {
  const [t, r, b, l] = exhibition.exhibition.openDirection;
  const startX = exhibition.width / 2 - (r === '0' ? 0 : MARK_LINE_DISTANCE);
  const startY = -exhibition.height / 2 - MARK_LINE_DISTANCE;
  const [tbNum, lrNum] = [getOpenNum(t, b), getOpenNum(l, r)];
  const pointTrack = [];
  ctx.lineWidth = MARK_LINE_WIDTH;
  ctx.beginPath();
  moveTo(ctx, startX, startY);
  lineTo(pointTrack, ctx, MARK_LINE_DISTANCE, 0);
  lineTo(pointTrack, ctx, 0, exhibition.height, 'b', tbNum);
  lineTo(pointTrack, ctx, -exhibition.width, 0, 'l', lrNum);
  lineTo(pointTrack, ctx, 0, -exhibition.height, 't', tbNum);
  lineTo(pointTrack, ctx, MARK_LINE_DISTANCE, 0);
  ctx.stroke();
  addBoderTrack(`M ${startX} ${startY} `, ctx, exhibition, pointTrack);
  drawText4SingleExhibition(ctx, exhibition, 't');
  drawOblique4Brand(ctx, exhibition);
};

//单个展位分配开口向右
const drawSinggl4Right = (ctx, exhibition) => {
  const [t, r, b, l] = exhibition.exhibition.openDirection;
  const startX = exhibition.width / 2 + MARK_LINE_DISTANCE;
  const startY = -exhibition.height / 2 + MARK_LINE_DISTANCE;
  const [tbNum, lrNum] = [getOpenNum(t, b), getOpenNum(l, r)];
  const pointTrack = [];
  ctx.lineWidth = MARK_LINE_WIDTH;
  ctx.beginPath();
  moveTo(ctx, startX, startY);
  lineTo(pointTrack, ctx, 0, -MARK_LINE_DISTANCE);
  lineTo(pointTrack, ctx, -exhibition.width, 0, 'l', lrNum);
  lineTo(pointTrack, ctx, 0, exhibition.height, 'b', tbNum);
  lineTo(pointTrack, ctx, exhibition.width, 0, 'r', lrNum);
  lineTo(pointTrack, ctx, 0, -MARK_LINE_DISTANCE);
  ctx.stroke();
  addBoderTrack(`M ${startX} ${startY} `, ctx, exhibition, pointTrack);
  drawText4SingleExhibition(ctx, exhibition, 'r');
  drawOblique4Brand(ctx, exhibition);
};

//单个展位分配开口向下
const drawSinggl4Bottom = (ctx, exhibition) => {
  const [t, r, b, l] = exhibition.exhibition.openDirection;
  const startX = exhibition.width / 2 - (r === '0' ? 0 : MARK_LINE_DISTANCE);
  const startY = exhibition.height / 2 + MARK_LINE_DISTANCE;
  const [tbNum, lrNum] = [getOpenNum(t, b), getOpenNum(l, r)];
  const pointTrack = [];
  ctx.lineWidth = MARK_LINE_WIDTH;
  ctx.beginPath();
  moveTo(ctx, startX, startY);
  lineTo(pointTrack, ctx, MARK_LINE_DISTANCE, 0);
  lineTo(pointTrack, ctx, 0, -exhibition.height, 't', tbNum);
  lineTo(pointTrack, ctx, -exhibition.width, 0, 'l', lrNum);
  lineTo(pointTrack, ctx, 0, exhibition.height, 'b', tbNum);
  lineTo(pointTrack, ctx, MARK_LINE_DISTANCE, 0);
  ctx.stroke();
  addBoderTrack(`M ${startX} ${startY} `, ctx, exhibition, pointTrack);
  drawText4SingleExhibition(ctx, exhibition, 'b');
  drawOblique4Brand(ctx, exhibition);
};

//单个展位分配开口向左
const drawSinggl4Left = (ctx, exhibition) => {
  const [t, r, b, l] = exhibition.exhibition.openDirection;
  const startX = -exhibition.width / 2 - MARK_LINE_DISTANCE;
  const startY = -exhibition.height / 2 + MARK_LINE_DISTANCE;
  const [tbNum, lrNum] = [getOpenNum(t, b), getOpenNum(l, r)];
  const pointTrack = [];
  ctx.lineWidth = MARK_LINE_WIDTH;
  ctx.beginPath();
  moveTo(ctx, startX, startY);
  lineTo(pointTrack, ctx, 0, -MARK_LINE_DISTANCE);
  lineTo(pointTrack, ctx, exhibition.width, 0, 'r', lrNum);
  lineTo(pointTrack, ctx, 0, exhibition.height, 'b', tbNum);
  lineTo(pointTrack, ctx, -exhibition.width, 0, 'l', lrNum);
  lineTo(pointTrack, ctx, 0, -MARK_LINE_DISTANCE);
  ctx.stroke();
  addBoderTrack(`M ${startX} ${startY} `, ctx, exhibition, pointTrack);
  drawText4SingleExhibition(ctx, exhibition, 'l');
  drawOblique4Brand(ctx, exhibition);
};

//为已分配企业的展位绘制页面显示效果
const drawExhibition4Plan = (ctx, exhibition) => {
  ctx.save();
  const drawSingleFun = {
    t: drawSingl4Top,
    r: drawSinggl4Right,
    b: drawSinggl4Bottom,
    l: drawSinggl4Left
  };
  const planOpenDirection = getOpenDirectionByExhibition(exhibition.exhibition.openDirection);
  drawSingleFun[planOpenDirection](ctx, exhibition);
  ctx.restore();
};

const drawExhibition4PlanTwo = (ctx, exhibition) => {
  ctx.save();
  const planInfo = exhibition.planInfo;
  let text = getExhibitionDesc(planInfo);
  text += exhibition.code;
  const textArray = branchDescribtion(ctx, text, exhibition.width);
  // textArray.push(exhibition.code);
  const fontSize = 10;
  ctx.fillStyle = 'black';
  textArray.forEach((item, index) => {
    const offset = (index - textArray.length / 2 + 1) * fontSize;
    const yCoord = offset;
    ctx.fillText(item, 0, yCoord);
    exhibition._textTrack({
      style: `font: ${ctx.font}; opacity: 1;`,
      x: -ctx.measureText(item).width / 2,
      y: yCoord,
      text: item
    });
  });
  drawOblique4Brand(ctx, exhibition);
  ctx.restore();
};

//绘制品牌展位斜线(多个展位)
const drawOblique4Brands = (ctx, exhibition) => {
  if (schemaInfo.exhibitionProperty !== '品牌展位') {
    return;
  }
  ctx.save();
  ctx.lineWidth = 1;
  ctx.setLineDash(LINE_DASH);
  ctx.beginPath();
  const positionNum = getPositionNum4Exh(exhibition);
  const [tbNum, rlNum] = [positionNum.t + positionNum.b + 1, positionNum.r + positionNum.l + 1];
  const [move, line] = [new fabric.Point(0, 0), new fabric.Point(0, 0)];
  if (tbNum >= rlNum) {
    move.setXY(exhibition.width * (0.5 - positionNum.t / tbNum), -exhibition.height / 2);
    line.setXY(exhibition.width * (positionNum.b / tbNum - 0.5), exhibition.height / 2);
  } else if (exhibition.planInfo.exhibitions.length > 2 && tbNum + rlNum === 3) {
    move.setXY(exhibition.width / 2, -exhibition.height / 2);
    line.setXY(-exhibition.width / 2, exhibition.height / 2);
  } else {
    move.setXY(exhibition.width / 2, exhibition.height * (positionNum.r / rlNum - 0.5));
    line.setXY(-exhibition.width / 2, exhibition.height * (0.5 - positionNum.l / rlNum));
  }

  ctx.moveTo(move.x, move.y);
  ctx.lineTo(line.x, line.y);
  exhibition._pathTrack(ctx, `M ${move.x} ${move.y} L ${line.x} ${line.y}`);
  ctx.stroke();
  ctx.restore();
};

//为展位添加描述信息(多个)
const drawText4RelationExhibition = (ctx, exhibition) => {
  const text = getExhibitionDesc(exhibition.planInfo);
  ctx.save();
  const positionNum = getPositionNum4Exh(exhibition);
  const [width, height] = [exhibition.width, exhibition.height];
  const [t, r, b, l] = exhibition.exhibition.openDirection;
  let [y, openWidth, transform, fontSize] = [0, 0, '', 0];
  let [lrDiff, tbDiff, rangeArray] = [positionNum.l - positionNum.r, positionNum.t - positionNum.b, [0, -1]];
  let isNeedDesc = false;
  ctx.fillStyle = '#000000';
  ctx.textAlign = 'center';
  switch (exhibition.planInfo.openDirection) {
    case 't':
      if (t === '0' && rangeArray.indexOf(lrDiff) !== -1) {
        isNeedDesc = true;
        y = -height / 2 - 2;
        openWidth = width * (positionNum.r + positionNum.l + 1) - MARK_LINE_DISTANCE;
        fontSize = calculateFontSize(ctx, openWidth, text);
        ctx.translate(-lrDiff * width / 2, 0);
        transform = `translate(${-lrDiff * width / 2}, 0)`;
      }
      break;
    case 'r':
      if (r === '0' && rangeArray.indexOf(tbDiff) !== -1) {
        isNeedDesc = true;
        y = -width / 2 - 2;
        openWidth = height * (positionNum.t + positionNum.b + 1) - MARK_LINE_DISTANCE;
        fontSize = calculateFontSize(ctx, openWidth, text);
        ctx.translate(0, -tbDiff * height / 2);
        ctx.rotate(90 * Math.PI / 180);
        transform = `translate(0, ${-tbDiff * height / 2}) rotate(90 0,0)`;
      }
      break;
    case 'b':
      if (b === '0' && rangeArray.indexOf(lrDiff) !== -1) {
        isNeedDesc = true;
        openWidth = width * (positionNum.r + positionNum.l + 1) - MARK_LINE_DISTANCE;
        fontSize = calculateFontSize(ctx, openWidth, text);
        y = height / 2 + fontSize;
        ctx.translate(-lrDiff * width / 2, 0);
        transform = `translate(${-lrDiff * width / 2}, 0)`;
      }
      break;
    case 'l':
      if (l === '0' && rangeArray.indexOf(tbDiff) !== -1) {
        isNeedDesc = true;
        ctx.translate(0, -tbDiff * height / 2);
        y = -width / 2 - 2;
        openWidth = height * (positionNum.t + positionNum.b + 1) - MARK_LINE_DISTANCE;
        fontSize = calculateFontSize(ctx, openWidth, text);
        ctx.rotate(-90 * Math.PI / 180);
        transform = `translate(0, ${-tbDiff * height / 2}) rotate(-90 0,0)`;
      }
      break;
    default:
      break;
  }
  if (isNeedDesc) {
    const scale = fontSize / 12;
    ctx.scale(scale, scale);
    y = y / scale;
    const textArray = branchDescribtion(ctx, text, openWidth / scale);
    textArray.forEach((item, index) => {
      const offset = (textArray.length - index - 1) * (fontSize / scale + 2);
      const yCoord = exhibition.planInfo.openDirection === 'b' ? y + index * (fontSize / scale + 2) : y - offset;
      ctx.fillText(item, 0, yCoord);
      exhibition._textTrack({
        'style': `font: ${ctx.font}; opacity: 1;`,
        'x': -ctx.measureText(item).width / 2,
        'y': yCoord,
        'text': item,
        'transform': transform
      });
    });
  }

  ctx.restore();
};

const drawExhibitions4Plan = (ctx, exhibition) => {
  const planInfo = exhibition.planInfo;
  const positionPoint = exhibition.get('positionShip');
  const [t, r, b, l] = exhibition.exhibition.openDirection;
  const [tbNum, lrNum] = [getOpenNum(t, b), getOpenNum(l, r)];
  let path = "";
  ctx.save();
  ctx.lineWidth = MARK_LINE_WIDTH;
  // draw for top
  //判断上方是否有展位
  if (!hasExhibition(planInfo.exhibitions, positionPoint.x, positionPoint.y - 1)) {
    ctx.beginPath();
    //判断上方是否为开口
    if (t === '0') {
      if (planInfo.openDirection === 't') { //是否为最终的开口方向
        //左边是否有展位
        if (!hasExhibition(planInfo.exhibitions, positionPoint.x - 1, positionPoint.y)) {
          if (l === '0') {
            moveTo(ctx, -exhibition.width / 2 - MARK_LINE_DISTANCE, -exhibition.height / 2 - MARK_LINE_DISTANCE);
          } else {
            moveTo(ctx, -exhibition.width / 2, -exhibition.height / 2 - MARK_LINE_DISTANCE);
          }
          path += `M ${lastPoint.x} ${lastPoint.y} `;
          lineTo([], ctx, MARK_LINE_DISTANCE, 0);
          path += `L ${lastPoint.x} ${lastPoint.y} `;
        }
        //右边是否有展位
        if (!hasExhibition(planInfo.exhibitions, positionPoint.x + 1, positionPoint.y)) {
          if (r === '0') {
            moveTo(ctx, exhibition.width / 2 + MARK_LINE_DISTANCE, -exhibition.height / 2 - MARK_LINE_DISTANCE);
          } else {
            moveTo(ctx, exhibition.width / 2, -exhibition.height / 2 - MARK_LINE_DISTANCE);
          }
          path += `M ${lastPoint.x} ${lastPoint.y} `;
          lineTo([], ctx, -MARK_LINE_DISTANCE, 0);
          path += `L ${lastPoint.x} ${lastPoint.y} `;
        }
      } else {
        if (l === '0') {
          moveTo(ctx, -exhibition.width / 2 - MARK_LINE_DISTANCE, -exhibition.height / 2 - MARK_LINE_DISTANCE);
        } else {
          moveTo(ctx, -exhibition.width / 2, -exhibition.height / 2 - MARK_LINE_DISTANCE);
        }
        path += `M ${lastPoint.x} ${lastPoint.y} `;
        lineTo([], ctx, exhibition.width, 0, 'r', lrNum);
        path += `L ${lastPoint.x} ${lastPoint.y} `;
      }
    } else {
      if (l === '0') {
        moveTo(ctx, -exhibition.width / 2 - MARK_LINE_DISTANCE, -exhibition.height / 2);
      } else {
        moveTo(ctx, -exhibition.width / 2, -exhibition.height / 2);
      }
      path += `M ${lastPoint.x} ${lastPoint.y} `;
      lineTo([], ctx, exhibition.width, 0, 'r', lrNum);
      path += `L ${lastPoint.x} ${lastPoint.y} `;
    }
    ctx.stroke();
  }
  //draw for right
  //判断右边是否有展位
  if (!hasExhibition(planInfo.exhibitions, positionPoint.x + 1, positionPoint.y)) {
    ctx.beginPath();
    //判断右边是否为开口
    if (r === '0') {
      //是否为最终的开口方向
      if (planInfo.openDirection === 'r') {
        //判断上方是否有展位
        if (!hasExhibition(planInfo.exhibitions, positionPoint.x, positionPoint.y - 1)) {
          if (t === '0') {
            moveTo(ctx, exhibition.width / 2 + MARK_LINE_DISTANCE, -exhibition.height / 2 - MARK_LINE_DISTANCE);
          } else {
            moveTo(ctx, exhibition.width / 2 + MARK_LINE_DISTANCE, -exhibition.height / 2);
          }
          path += `M ${lastPoint.x} ${lastPoint.y} `;
          lineTo([], ctx, 0, MARK_LINE_DISTANCE);
          path += `L ${lastPoint.x} ${lastPoint.y} `;
        }
        //判断下方是否有展位
        if (!hasExhibition(planInfo.exhibitions, positionPoint.x, positionPoint.y + 1)) {
          if (b === '0') {
            moveTo(ctx, exhibition.width / 2 + MARK_LINE_DISTANCE, exhibition.height / 2 + MARK_LINE_DISTANCE);
          } else {
            moveTo(ctx, exhibition.width / 2 + MARK_LINE_DISTANCE, exhibition.height / 2);
          }
          path += `M ${lastPoint.x} ${lastPoint.y} `;
          lineTo([], ctx, 0, -MARK_LINE_DISTANCE);
          path += `L ${lastPoint.x} ${lastPoint.y} `;
        }
      } else {
        if (t === '0') {
          moveTo(ctx, exhibition.width / 2 + MARK_LINE_DISTANCE, -exhibition.height / 2 - MARK_LINE_DISTANCE);
        } else {
          moveTo(ctx, exhibition.width / 2 + MARK_LINE_DISTANCE, -exhibition.height / 2);
        }
        path += `M ${lastPoint.x} ${lastPoint.y} `;
        lineTo([], ctx, 0, exhibition.height, 'b', tbNum);
        path += `L ${lastPoint.x} ${lastPoint.y} `;
      }
    } else {
      //判断上方是否开口
      if (t === '0') {
        moveTo(ctx, exhibition.width / 2, -exhibition.height / 2 - MARK_LINE_DISTANCE);
      } else {
        moveTo(ctx, exhibition.width / 2, -exhibition.height / 2);
      }
      path += `M ${lastPoint.x} ${lastPoint.y} `;
      lineTo([], ctx, 0, exhibition.height, 'b', tbNum);
      path += `L ${lastPoint.x} ${lastPoint.y} `;
    }
    ctx.stroke();
  }
  //draw for bottom
  //判断下边是否有展位
  if (!hasExhibition(planInfo.exhibitions, positionPoint.x, positionPoint.y + 1)) {
    ctx.beginPath();
    //判断下边是否为开口
    if (b === '0') {
      //是否为最终的开口方向
      if (planInfo.openDirection === 'b') {
        //判断左边是否有展位
        if (!hasExhibition(planInfo.exhibitions, positionPoint.x - 1, positionPoint.y)) {
          if (l === '0') {
            moveTo(ctx, -exhibition.width / 2 - MARK_LINE_DISTANCE, exhibition.height / 2 + MARK_LINE_DISTANCE);
          } else {
            moveTo(ctx, -exhibition.width / 2, exhibition.height / 2 + MARK_LINE_DISTANCE);
          }
          path += `M ${lastPoint.x} ${lastPoint.y} `;
          lineTo([], ctx, MARK_LINE_DISTANCE, 0);
          path += `L ${lastPoint.x} ${lastPoint.y} `;
        }
        //判断右边是否有展位
        if (!hasExhibition(planInfo.exhibitions, positionPoint.x + 1, positionPoint.y)) {
          if (r === '0') {
            moveTo(ctx, exhibition.width / 2 + MARK_LINE_DISTANCE, exhibition.height / 2 + MARK_LINE_DISTANCE);
          } else {
            moveTo(ctx, exhibition.width / 2, exhibition.height / 2 + MARK_LINE_DISTANCE);
          }
          path += `M ${lastPoint.x} ${lastPoint.y} `;
          lineTo([], ctx, -MARK_LINE_DISTANCE, 0);
          path += `L ${lastPoint.x} ${lastPoint.y} `;
        }
      } else {
        if (l === '0') {
          moveTo(ctx, -exhibition.width / 2 - MARK_LINE_DISTANCE, exhibition.height / 2 + MARK_LINE_DISTANCE);
        } else {
          moveTo(ctx, -exhibition.width / 2, exhibition.height / 2 + MARK_LINE_DISTANCE);
        }
        path += `M ${lastPoint.x} ${lastPoint.y} `;
        lineTo([], ctx, exhibition.width, 0, 'r', lrNum);
        path += `L ${lastPoint.x} ${lastPoint.y} `;
      }
    } else {
      //判断左边是否开口
      if (l === '0') {
        moveTo(ctx, -exhibition.width / 2 - MARK_LINE_DISTANCE, exhibition.height / 2);
      } else {
        moveTo(ctx, -exhibition.width / 2, exhibition.height / 2);
      }
      path += `M ${lastPoint.x} ${lastPoint.y} `;
      lineTo([], ctx, exhibition.width, 0, 'r', lrNum);
      path += `L ${lastPoint.x} ${lastPoint.y} `;
    }
    ctx.stroke();
  }
  //draw for left
  //判断左边边是否有展位
  if (!hasExhibition(planInfo.exhibitions, positionPoint.x - 1, positionPoint.y)) {
    ctx.beginPath();
    //判断右边是否为开口
    if (l === '0') {
      //是否为最终的开口方向
      if (planInfo.openDirection === 'l') {
        //判断上方是否有展位
        if (!hasExhibition(planInfo.exhibitions, positionPoint.x, positionPoint.y - 1)) {
          if (t === '0') {
            moveTo(ctx, -exhibition.width / 2 - MARK_LINE_DISTANCE, -exhibition.height / 2 - MARK_LINE_DISTANCE);
          } else {
            moveTo(ctx, -exhibition.width / 2 - MARK_LINE_DISTANCE, -exhibition.height / 2);
          }
          path += `M ${lastPoint.x} ${lastPoint.y} `;
          lineTo([], ctx, 0, MARK_LINE_DISTANCE);
          path += `L ${lastPoint.x} ${lastPoint.y} `;
        }
        //判断下方是否有展位
        if (!hasExhibition(planInfo.exhibitions, positionPoint.x, positionPoint.y + 1)) {
          if (b === '0') {
            moveTo(ctx, -exhibition.width / 2 - MARK_LINE_DISTANCE, exhibition.height / 2 + MARK_LINE_DISTANCE);
          } else {
            moveTo(ctx, -exhibition.width / 2 - MARK_LINE_DISTANCE, exhibition.height / 2);
          }
          path += `M ${lastPoint.x} ${lastPoint.y} `;
          lineTo([], ctx, 0, -MARK_LINE_DISTANCE);
          path += `L ${lastPoint.x} ${lastPoint.y} `;
        }
      } else {
        if (t === '0') {
          moveTo(ctx, -exhibition.width / 2 - MARK_LINE_DISTANCE, -exhibition.height / 2 - MARK_LINE_DISTANCE);
        } else {
          moveTo(ctx, -exhibition.width / 2 - MARK_LINE_DISTANCE, -exhibition.height / 2);
        }
        path += `M ${lastPoint.x} ${lastPoint.y} `;
        lineTo([], ctx, 0, exhibition.height, 'b', tbNum);
        path += `L ${lastPoint.x} ${lastPoint.y} `;
      }
    } else {
      //判断上方是否开口
      if (t === '0') {
        moveTo(ctx, -exhibition.width / 2, -exhibition.height / 2 - MARK_LINE_DISTANCE);
      } else {
        moveTo(ctx, -exhibition.width / 2, -exhibition.height / 2);
      }
      path += `M ${lastPoint.x} ${lastPoint.y} `;
      lineTo([], ctx, 0, exhibition.height, 'b', tbNum);
      path += `L ${lastPoint.x} ${lastPoint.y} `;
    }
    ctx.stroke();
  }
  exhibition._pathTrack(ctx, path);
  ctx.restore();
  drawOblique4Brands(ctx, exhibition);
  drawText4RelationExhibition(ctx, exhibition);
};

const clearLine = (ctx, exhibition, border) => {
  ctx.save();
  const [width, height] = [exhibition.width, exhibition.height];
  ctx.strokeStyle = 'yellow';
  const symbolArray = QUADRANT_SYMBOL[border];
  const [move, line] = [new fabric.Point(width / 2 * symbolArray[0].x, height / 2 * symbolArray[0].y), new fabric.Point(width / 2 * symbolArray[1].x, height / 2 * symbolArray[1].y)];
  ctx.beginPath();
  ctx.moveTo(move.x, move.y);
  ctx.lineTo(line.x, line.y);
  exhibition._pathTrack(ctx, `M ${move.x} ${move.y} L ${line.x} ${line.y}`);
  ctx.stroke();
  ctx.restore();
};

// 绘制多个展位分配显示效果,模式二
const drawExhibitions4PlanTwo = (ctx, exhibition) => {
  ctx.save();
  const planInfo = exhibition.planInfo;
  // 去掉相邻展位的分隔线
  const positionNum = getPositionNum4Exh(exhibition);
  for (let key in positionNum) {
    positionNum[key] && clearLine(ctx, exhibition, key);
  }
  drawOblique4Brands(ctx, exhibition);// 绘制品牌斜线
  if (planInfo.isLast) {
    ctx.fillStyle = 'black';
    let text = getExhibitionDesc(planInfo);
    let codes = planInfo.exhibitions.map(item => item.code).sort((current, next) => current - next);
    text += codes[0] + (codes.length > 1 ? `-${codes[codes.length - 1]}` : '');
    const positionShip = exhibition.positionShip;
    const [offsetX, offsetY] = [-exhibition.width / 2 * (positionShip.x - 0), -exhibition.height / 2 * (positionShip.y - 0)];
    ctx.translate(offsetX, offsetY);
    const transform = `translate(${offsetX}, ${offsetY})`;
    const textArray = branchDescribtion(ctx, text, exhibition.width);
    const fontSize = Number(ctx.font.substr(0, ctx.font.indexOf('px')));
    textArray.forEach((item, index) => {
      const yCoord = (index - textArray.length + 1) * fontSize;
      ctx.fillText(item, 0, yCoord);
      exhibition._textTrack({
        style: `font: ${ctx.font}; opacity: 1;`,
        x: -ctx.measureText(item).width / 2,
        y: yCoord,
        text: item,
        transform: transform
      });
    });
    ctx.restore();
  }
};

/**
 *  user-defined classes
 **/

//展位Base
const Exhibition = fabric.util.createClass(fabric.Rect, {
  type: "exhibition",
  initialize: function(exhibition) {
    // const notDisabled = schemaInfo.exhibitionAreaCode === exhibition.exhibitionAreaCode;
    const defaultOption = {
      fill: 'white',
      stroke: 'black',
      strokeDashArray: [2, 4],
      hoverCursor: 'pointer',
      width: exhibition.width,
      height: exhibition.height,
      left: exhibition.startPointX,
      top: exhibition.startPointY,
      selectable: false
    };
    this.callSuper('initialize', defaultOption);
    this.set('exhibition', exhibition);
    this.set('code', exhibition.boothCode);
    this.set('planInfo', null);
  },
  _render: function (ctx) {
    this.callSuper('_render', ctx);
    this.set('svgTrack', []);
    //绘制开口方向,开头虚线
    if (this.exhibition.openDirection) {
      const [topLine, righLine, bottomLine, leftLine] = this.exhibition.openDirection;
      const open = { t: topLine, r: righLine, b: bottomLine, l: leftLine };
      const [xValue, yValue] = [this.width / 2, this.height / 2];
      const coord = {
        tl: { x: -xValue, y: -yValue },
        tr: { x: xValue, y: -yValue },
        bl: { x: -xValue, y: yValue },
        br: { x: xValue, y: yValue }
      };
      for (const key in open) {
        if (open[key] === '0') {
          continue;
        }
        let [movePoint, linePoint] = [null, null];
        switch (key) {
          case 't':
            [movePoint, linePoint] = [coord.tl, coord.tr];
            break;
          case 'r':
            [movePoint, linePoint] = [coord.tr, coord.br];
            break;
          case 'b':
            [movePoint, linePoint] = [coord.bl, coord.br];
            break;
          case 'l':
            [movePoint, linePoint] = [coord.tl, coord.bl];
            break;
          default:
            break;
        }
        ctx.beginPath();
        ctx.moveTo(movePoint.x, movePoint.y);
        ctx.lineTo(linePoint.x, linePoint.y);
        this._pathTrack(ctx, `M ${movePoint.x} ${movePoint.y} L ${linePoint.x} ${linePoint.y}`);
        ctx.stroke();
      }
    }
    if (!this.planInfo || this.planInfo.planedModel !== SHOW_PLANED_MODEL_TWO) {
      ctx.save();
      //标注展位名称
      ctx.fillStyle = '#000000';
      ctx.textAlign = 'center';
      let showCode = this.code;
      const channelName = showCode.match(/[a-z]/ig).join('');
      showCode = showCode.split(channelName)[1];
      let scale = this.width / ctx.measureText(showCode).width;
      scale = scale > 1 ? 1 : scale * 0.9;
      ctx.scale(scale, scale);
      ctx.fillText(showCode, 0, 5);
      this._textTrack({
        'style': `font: ${ctx.font}; opacity: 1;`,
        'x': -ctx.measureText(showCode).width / 2,
        'y': 5,
        'text': showCode,
        transform: `scale(${scale}, ${scale})`
      });
      ctx.restore();
    }
    if (this.planInfo) {
      if (this.planInfo.num === 1) {
        this.planInfo.planedModel === SHOW_PLANED_MODEL_ONE ? drawExhibition4Plan(ctx, this) : drawExhibition4PlanTwo(ctx, this);
      } else {
        this.planInfo.planedModel === SHOW_PLANED_MODEL_ONE ? drawExhibitions4Plan(ctx, this) : drawExhibitions4PlanTwo(ctx, this);
      }
    }
  },
  _toSVG: function() {
    const [x, y] = [-this.width / 2, -this.height / 2];
    const objectMarkup = [
      '<rect ', 'COMMON_PARTS',
      'x="', x, '" y="', y,
      '" rx="', this.rx, '" ry="', this.ry,
      '" width="', this.width, '" height="', this.height,
      '" />\n'
    ];
    (this.get('svgTrack') || []).forEach((track) => {
      const type = track.type;
      objectMarkup.push(`<${type}`);
      for (const key in track.properties) {
        if (key === type) {
          continue;
        }
        objectMarkup.push(` ${key}="${track.properties[key]}" `);
      }
      objectMarkup.push(`>${track.properties[type] || ''}</${type}>`);
    });
    return objectMarkup;
  }
});
Exhibition.prototype.check = function() {
  if (this.planInfo) {
    this.set('fill', COLOR_PLANED_SELECTED);
  } else {
    this.set('fill', COLOR_SELECTED);
    this.set("checked", true);
  }
};
Exhibition.prototype.uncheck = function() {
  if (this.planInfo) {
    this.set('fill', this.planInfo.enterprise.exhibitsSpecialAreaColor || COLOR_PLANED);
  } else {
    this.set('fill', COLOR_DEFAULT);
    this.set("checked", false);
  }
};
Exhibition.prototype.plan = function(planInfo, color = COLOR_PLANED) {
  this.set('fill', color);
  this.set("checked", undefined);
  this.set('hasPlaned', true);
  /*this.set('selectable', false);*/
  this.set('planInfo', planInfo);
};
Exhibition.prototype.resetPlaned = function() {
  this.initialize(this.get('exhibition'));
  this.set('positionShip', undefined);
  this.set('arrayIndex', undefined);
};
Exhibition.prototype._pathTrack = function (ctx, path) {
  this.get('svgTrack').push({
    type: 'path',
    properties: {
      'stroke': ctx.strokeStyle,
      'stroke-width': ctx.lineWidth,
      'fill': 'none',
      'stroke-dasharray': ctx.getLineDash(),
      'd': path
    }
  });
};
Exhibition.prototype._textTrack = function (properties) {
  this.get('svgTrack').push({
    type: 'text',
    properties: properties
  });
};

//标准展位
const StandardExhibition = fabric.util.createClass(Exhibition, {
  type: "standard",
  initialize: function(exhibition) {
    this.callSuper('initialize', exhibition);
  },
  toObject: function () {
    return this.callSuper('toObject');
  },
  _render: function (ctx) {
    this.callSuper('_render', ctx);
  }
});

//岛型展位
const IslandExhibition = fabric.util.createClass(Exhibition, {
  type: "island",
  initialize: function(exhibition) {
    this.callSuper('initialize', exhibition);
  },
  toObject: function () {
    return fabric.util.object.extend(this.callSuper('toObject'), {

    });
  },
  _render: function (ctx) {
    this.callSuper('_render', ctx);
    ctx.save();
    //展位标尺
    const [markLineLength, percent, x, y]
      = [Math.SQRT2 * 2, 0.4, this.width / 2, this.height / 2];
    const [wPercent, hPersent] = [this.width * percent, this.height * percent];
    ctx.beginPath();
    ctx.moveTo(-wPercent, -y);
    ctx.lineTo(-wPercent, y);
    ctx.moveTo(-wPercent - markLineLength, -y - markLineLength);
    ctx.lineTo(-wPercent + markLineLength, -y + markLineLength);
    ctx.moveTo(-wPercent - markLineLength, y - markLineLength);
    ctx.lineTo(-wPercent + markLineLength, y + markLineLength);
    ctx.moveTo(-x, -hPersent);
    ctx.lineTo(x, -hPersent);
    ctx.moveTo(-x - markLineLength, -hPersent + markLineLength);
    ctx.lineTo(-x + markLineLength, -hPersent - markLineLength);
    ctx.moveTo(x - markLineLength, -hPersent + markLineLength);
    ctx.lineTo(x + markLineLength, -hPersent - markLineLength);
    ctx.stroke();
    this._pathTrack(ctx, `M ${-wPercent} ${-y} L ${-wPercent} ${y}
                    M ${-wPercent - markLineLength} ${-y - markLineLength} L ${-wPercent + markLineLength} ${-y + markLineLength}
                    M ${-wPercent - markLineLength} ${y - markLineLength}
                    L ${-wPercent + markLineLength} ${y + markLineLength}
                    M ${-x} ${-hPersent}
                    L${x} ${-hPersent}
                    M ${-x - markLineLength} ${-hPersent + markLineLength}
                    L ${-x + markLineLength} ${-hPersent - markLineLength}
                    M${x - markLineLength} ${-hPersent + markLineLength}
                    L${x + markLineLength} ${-hPersent - markLineLength}`);

    const scales = this.canvas.scales.filter(scale => scale.dealScaleCoordinates.every(point => point.pointX >= this.left && point.pointX <= this.left + this.width && point.pointY >= this.top && point.pointY <= this.top + this.height));
    scales.forEach(scale => {
      ctx.save();
      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';
      const text = scale.scaleSize;
      let [rotate, yCoord] = [0, -this.height * percent];
      if (scale.dealScaleCoordinates[0].pointX === scale.dealScaleCoordinates[1].pointX) {
        ctx.rotate(-90 * Math.PI / 180);
        yCoord = -this.width * percent;
        rotate = -90;
      }
      ctx.fillText(text, 0, yCoord);
      this._textTrack({
        'style': `font: ${ctx.font}; opacity: 1;`,
        'x': -ctx.measureText(text).width / 2,
        'y': yCoord,
        'text': text,
        'transform': `rotate(${rotate} 0,0)`
      });
      ctx.restore();
    });
    ctx.restore();
  }
});

// 基础设施设备

// 辅助区域
/*const AuxiliaryArea = fabric.util.createClass(fabric.Rect, {
  type: 'AuxiliaryArea',
  initialize: function (option) {
    const options = {
      fill: 'white',
      stroke: 'black',
      width: option.width,
      height: option.height,
      left: option.x,
      top: option.y,
      hoverCursor: 'default',
      selectable: false
    };
    this.callSuper('initialize', options);
    this.set('name', option.name);
  },
  _render: function (ctx) {
    this.callSuper('_render', ctx);
    this.set('svgTrack', []);
    this.set('textLength', ctx.measureText(this.text).width);
    // 图例描述
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'center';
    const textWidth = ctx.measureText(this.name).width;
    let rotate = 0;
    if (this.width < textWidth) {
      ctx.rotate(90 * Math.PI / 180);
      rotate = 90;
    }
    ctx.fillText(this.name, 0, 5);
    this.get('svgTrack').push({
      type: 'text',
      properties: {
        'style': `font: ${ctx.font}; opacity: 1;`,
        'x': -textWidth / 2,
        'y': 5,
        'text': this.name,
        'transform': `rotate(${rotate} 0,0)`
      }
    });
  },
  _toSVG: function() {
    const [x, y] = [-this.width / 2, -this.height / 2];
    const objectMarkup = [
      '<rect ', 'COMMON_PARTS',
      'x="', x, '" y="', y,
      '" rx="', this.rx, '" ry="', this.ry,
      '" width="', this.width, '" height="', this.height,
      '" />\n'
    ];
    this.get('svgTrack').forEach((track) => {
      const type = track.type;
      objectMarkup.push(`<${type}`);
      for (const key in track.properties) {
        if (key === type) {
          continue;
        }
        objectMarkup.push(` ${key}="${track.properties[key]}" `);
      }
      objectMarkup.push(`>${track.properties[type] || ''}</${type}>`);
    });
    return objectMarkup;
  }
});*/

// 图例
const Legend = fabric.util.createClass(fabric.Rect, {
  type: 'legend',
  initialize: function (color, text, x, y) {
    const options = {
      fill: color,
      stroke: color,
      width: LEGEND_WIDTH,
      height: LEGEND_HEIGHT,
      left: x,
      top: y,
      hoverCursor: 'default',
      selectable: false
    };
    this.callSuper('initialize', options);
    this.set('text', text);
  },
  _render: function (ctx) {
    this.callSuper('_render', ctx);

    // this.set('svgTrack', []);
    // this.set('textLength', ctx.measureText(this.text).width);
    // // 图例描述
    // ctx.fillStyle = '#000000';
    // ctx.fillText(this.text, this.width * 0.67, 4);
    // this.get('svgTrack').push({
    //   type: 'text',
    //   properties: {
    //     'style': `font: ${ctx.font}; opacity: 1;`,
    //     'x': this.width * 0.67,
    //     'y': 4,
    //     'text': this.text
    //   }
    // });
  },
  _toSVG: function() {
    const [x, y] = [-this.width / 2, -this.height / 2];
    const objectMarkup = [
      '<rect ', 'COMMON_PARTS',
      'x="', x, '" y="', y,
      '" rx="', this.rx, '" ry="', this.ry,
      '" width="', this.width, '" height="', this.height,
      '" />\n'
    ];
    this.get('svgTrack').forEach((track) => {
      const type = track.type;
      objectMarkup.push(`<${type}`);
      for (const key in track.properties) {
        if (key === type) {
          continue;
        }
        objectMarkup.push(` ${key}="${track.properties[key]}" `);
      }
      objectMarkup.push(`>${track.properties[type] || ''}</${type}>`);
    });
    return objectMarkup;
  }
});

/**
 *  extensional methods for the class called fabric.Canvas
 **/

// 根据展位的属性名称和属性值查找展位
// 返回数组
fabric.Canvas.prototype.getExhibitionByPropName = function(name, value) {
  return this._objects.filter(function (object) {
    return object[name] && object[name] === value;
  });
};

// 将岛型展位根据展位号拆分为多个展位,只用于做业务操作,不在地图展示
fabric.Canvas.prototype._drawIsland4Hide = function(islandExhibition) {
  const splitExhibitions = [];
  let code = islandExhibition.code;
  if (code.indexOf('-') === -1) {
    const channelName = code.match(/[a-z]/ig).join('');
    code += '-' + code.split(channelName)[1];
  }
  let [first, end] = [...code.split('-')];
  const length = first.length - end.length;
  let [prefix, start] = [first.substr(0, length), first.substr(length)];

  for (let i = Number(start); i <= Number(end); i++) {
    const diffLen = end.length - (i + "").length;
    let currentCode = prefix;
    for (let j = 0; j < diffLen; j++) {
      currentCode += "0";
    }
    const resultCode = currentCode + i;
    const island = new IslandExhibition(Object.assign({}, islandExhibition.exhibition, { boothCode: resultCode }));
    island.setOptions({
      code: resultCode,
      selectable: false,
      opacity: 0,
      top: -100,
      left: -100
    });
    this.add(island);
    splitExhibitions.push(island);
  }
  return splitExhibitions;
};

// 在canvas画布中添加展位
fabric.Canvas.prototype.addStand = function(data, xScale, yScale, startX, startY) {
  let exhibition = {};
  const drawData = getExhibitionDrawData(data.boothLines, xScale, yScale, startX, startY);
  let extendData = Object.assign(data, drawData);
  // console.log(this.exhibitionHall);
  // extendData = Object.assign(extendData,
  //   {
  //     pavilionNumber: this.exhibitionHall.pavilionCode,
  //     floor: this.exhibitionHall.floorNum,
  //     channel: data.boothCode.replace(this.exhibitionHall.exhibitionHallCode, '').match(/[a-z]/ig).join('')
  //   });
  if (data.isIsland) {
    exhibition = new IslandExhibition(extendData);
    exhibition.set('isNotData', true);
    const splitExhibitions = this._drawIsland4Hide(exhibition);
    exhibition.set('split', splitExhibitions);
  } else {
    exhibition = new StandardExhibition(extendData);
  }
  this.add(exhibition);
};

// 添加基础设施设备和辅助区域
fabric.Canvas.prototype._addFacility = function (facility, imgData, startX, startY, xScale, yScale, width, height) {
  let icon = document.getElementById(facility.facilityIcon);
  if (!icon) {
    // 创建一个img标签用于存放Icon
    const img = document.createElement("img");
    img.setAttribute("id", facility.facilityIcon);
    img.style.display = "none";
    document.body.append(img);
    icon = document.getElementById(facility.facilityIcon);
    icon.setAttribute('src', `data:image/png;base64,${imgData.fileContent}`);
  }
  const isInfrastructure = facility.type === 1;
  let scaleX = isInfrastructure ? (facility.length * xScale) / icon.naturalWidth : 0.2;
  let scaleY = isInfrastructure ? (facility.width * yScale) / icon.naturalHeight : 0.2;
  // if (facility.facilityName === '消防栓') {
  //   scaleX = 1;
  //   scaleY = 1;
  // }
  const imgInstance = new fabric.Image(icon, {
    left: this.coordLeft(isInfrastructure, OFFSET_WIDTH + width * xScale, (facility.pointX - startX - (isInfrastructure ? facility.length / 2 : 0)) * xScale + OFFSET_WIDTH),
    top: this.coordTop(isInfrastructure, -(facility.pointY - startY + (isInfrastructure ? facility.width / 2 : 0)) * yScale + OFFSET_HEIGHT),
    scaleX: scaleX,
    scaleY: scaleY,
    // scaleY: (facility.width * yScale) / icon.naturalHeight,
    hoverCursor: 'default',
    selectable: false
  });
  // console.log((facility.length * xScale) / icon.naturalWidth);
  // console.log((facility.pointX - startX - (isInfrastructure ? facility.length / 2 : 0)) * xScale + OFFSET_WIDTH);
  // console.log(imgInstance);
  this.add(imgInstance);
};

// 坐标计算基础设施设备和辅助区域
fabric.Canvas.prototype.coordLeft = function(facility, count, data) {
  if (facility) {
    return data;
  }
  if (data > 70 && data < 90) {
    return OFFSET_WIDTH + 1;
  } else {
    return count - 41;
  }
};
fabric.Canvas.prototype.coordTop = function(facility, data) {
  return data;
};

// 绘制展位分布图
fabric.Canvas.prototype.drawGraph = function(data, state) {
  this.ruleRelatedData = Object.assign({}, {
    // loading: false, // 是否加载规则校验对比的相关数据
    data: {}, // 规则校验对比的相关数据
    violateRuleList: {} // 企业安排违反的规则
  });
  // 专区图例
  this.specialAreaLegend = {};
  colorGroups = {
    exhibitIdOneName: {},
    exhibitIdTwoName: {},
    businessDelegation: {}
  };
  schemaInfo = this.schemaInfo;

  fabric.Object.prototype.selectable = state;

  const boothInfo = data;

  // 绘制展厅信息
  const [startX, startY, width, height] = getHallDrawData(boothInfo.exhibitionHallCoordinates);
  const [xScale, yScale] = [(this.width - OFFSET_WIDTH * 2) / width, (this.height - OFFSET_HEIGHT * 2) / height];

  const borderOptions = {
    paintFirst: 'stroke',
    hoverCursor: 'defaultCursor',
    fill: 'white',
    stroke: 'black',
    selectable: false
  };
  const borders = [];
  borders.push(`M${OFFSET_WIDTH},${OFFSET_HEIGHT} l${width * xScale} 0`);//top
  borders.push(`M${OFFSET_WIDTH + width * xScale},${OFFSET_HEIGHT} l0 ${height * yScale}`);//right
  borders.push(`M${OFFSET_WIDTH + width * xScale},${OFFSET_HEIGHT + height * yScale} l${-width * xScale} 0`);//bottom
  borders.push(`M${OFFSET_WIDTH},${OFFSET_HEIGHT + height * yScale} l0 ${-height * yScale}`);//left
  borders.forEach((border) => {
    this.add(new fabric.Path(border, borderOptions));
  });

  //绘制展区范围
  /*boothInfo.regions.forEach(region => {
    const getLine = (point, index) => {
      let endPoint = {};
      if (index === region.regionCoordinates.length - 1) {
        endPoint = region.regionCoordinates[0];
      } else {
        endPoint = region.regionCoordinates[index + 1];
      }
      return new fabric.Path(`M${OFFSET_WIDTH + (point.pointX - startX) * xScale},${OFFSET_HEIGHT + (point.pointY - startY) * yScale} L${OFFSET_WIDTH + (endPoint.pointX - startX) * xScale},${OFFSET_HEIGHT + (endPoint.pointY - startY) * yScale}`, borderOptions);
    };
    region.regionCoordinates.forEach((point, index) => {
      this.add(getLine(point, index));
    });

  });*/

  // 通道信息
  this.channels = [];
  boothInfo.channels.forEach(item => {
    if (!item.channelCoordinates) {
      return;
    }
    const channel = getExhibitionDrawData(item.channelCoordinates, xScale, yScale, startX, startY);
    delete channel.openDirection;
    this.channels.push(Object.assign({ type: item.channelType, direction: item.direction }, channel));
    let [offsetTop, offsetLeft] = [0, 0];
    if (channel.width >= channel.height) {
      offsetTop = (channel.height - 15) / 2;
    } else {
      offsetLeft = (channel.width - 15) / 2;
    }
    const channelText = new fabric.Text(item.channelCode, {
      top: channel.startPointY + offsetTop,
      left: channel.startPointX + offsetLeft,
      selectable: false,
      fontSize: 15 //Math.floor(channel.width / (item.channelCode.length))
    });
    this.add(channelText);
  });

  // 绘制标题
  // const [mainSize, subSize] = [20, 14];
  // const mainTitle = new fabric.Text(`${schemaInfo.exhibitionAreaName}展区` + "    展厅: " + boothInfo.exhibitionHall.exhibitionHallCode, {
  //   top: OFFSET_HEIGHT - mainSize - 4,
  //   left: OFFSET_WIDTH,
  //   fontSize: mainSize,
  //   selectable: false
  // });
  // this.add(mainTitle);

  // 绘制基础设施设备及辅助区域
  boothInfo.facilities.forEach(facility => {
    if (facilityIcons[facility.facilityIcon]) {
      this._addFacility(facility, facilityIcons[facility.facilityIcon], startX, startY, xScale, yScale, width, height);
    } else {
      this.getIcon(facility.facilityIcon)
      .then(res => {
        facilityIcons[facility.facilityIcon] = res;
        this._addFacility(facility, res, startX, startY, xScale, yScale, width, height);
      });
    }
  });

  this.scales = [];
  //绘制标尺
  boothInfo.scales.forEach(scale => {
    //标尺坐标处理
    scale.dealScaleCoordinates = [];
    scale.scaleCoordinates.forEach(coord => {
      scale.dealScaleCoordinates.push({
        pointX: (coord.pointX - startX) * xScale + OFFSET_WIDTH,
        pointY: -(coord.pointY - startY) * yScale + OFFSET_HEIGHT
      });
    });
    this.scales.push(scale);
  });
  // console.log(boothInfo.booths);
  // 绘制展位
  boothInfo.booths.forEach(stand => this.addStand(stand, xScale, yScale, startX, startY));

  // const allExhibitions = this._objects.filter(item => item.code && item.code.indexOf('-') === -1);
  // const canPlanExhibitions = allExhibitions.filter(item => item.exhibition.exhibitionAreaCode === this.schemaInfo.exhibitionAreaCode);

  // const subTitle = new fabric.Text(`(展位数${canPlanExhibitions.length}个,可搭展展位数${allExhibitions.length}个)`, {
  //   top: OFFSET_HEIGHT - subSize - 4,
  //   left: OFFSET_WIDTH + mainTitle.width + 20,
  //   fontSize: subSize,
  //   selectable: false
  // });
  // this.add(subTitle);
  //this.renderAll();
};

fabric.Canvas.prototype.zoomCanvas = function (zoom) {
  const OldZoom = this.getZoom();
  const zoomPoint = new fabric.Point(this.width / 2, this.height / 2);
  this.zoomToPoint(zoomPoint, zoom);
  if (!this.transTrack) {
    this.transTrack = [];
  }
  this.transTrack.push({
    type: 'zoom',
    value: {
      point: zoomPoint,
      zoomOffset: OldZoom - zoom
    }
  });
};

// canvas添加监听事件
fabric.Canvas.prototype.addEventListener = function() {
  this.on({
    //放大/缩小,需按下Ctrl键
    'mouse:wheel': function (options) {
      const event = options.e;
      // if (event.altKey) {
      const delta = event.deltaY;
      const OldZoom = this.getZoom();
      let newZoom = OldZoom - delta / 400;
      if (newZoom > 3) {
        newZoom = 3;
      } else if (newZoom < 1) {
        newZoom = 1;
      }
      const zoomPoint = new fabric.Point(event.offsetX, event.offsetY);
      this.zoomToPoint(zoomPoint, newZoom);
      if (!this.transTrack) {
        this.transTrack = [];
      }
      this.transTrack.push({
        type: 'zoom',
        value: {
          point: zoomPoint,
          zoomOffset: OldZoom - newZoom
        }
      });
      event.preventDefault();
      event.stopPropagation();
      // }
    },
    'mouse:up': function (options) {
      if (this.isDragging) {
        this.isDragging = false;
        this.selection = true;
      }
      // const actives = this.getActiveObjects();
      // if (actives.length > 1) {
      //   actives.forEach(function (object) {
      //     if (!object.get('checked')) {
      //       object.check();
      //     }
      //   });
      //   this.discardActiveObject();
      // } else {
      //   let target = options.target;
      //   if (target && !target.selectable) {
      //     return;
      //   }
      //   const checkedList = this.getExhibitionByPropName('checked', true);
      //   const removeList = this.getExhibitionByPropName('fill', COLOR_PLANED_SELECTED);
      //   if (this.getActiveObject() && !target) {
      //     target = this.getActiveObject();
      //   }
      //   if (!target) { //未选中,鼠标点击非展位区域
      //     checkedList.forEach((object) => object.uncheck());
      //     removeList.forEach((object) => object.uncheck());
      //   } else {
      //     const event = options.e;
      //     //是否多选(Ctrl是否按下)
      //     if (event.ctrlKey) {
      //       if (target.checked || target.fill === COLOR_PLANED_SELECTED) {
      //         target.uncheck();
      //       } else {
      //         target.check();
      //       }
      //     } else { //单选
      //       const length = checkedList.length || removeList.length;
      //       switch (length) {
      //         case 0: //初次选中
      //           target.check();
      //           break;
      //         default:
      //           //选中后再次点击去掉选中状态
      //           if (checkedList.length === 1 && checkedList[0].code === target.code) {
      //             target.uncheck();
      //           } else {
      //             //多选后单选,只选中当前
      //             checkedList.forEach((object) => object.uncheck());
      //             target.check();
      //           }
      //           if (removeList.length === 1 && removeList[0].code === target.code) {
      //             target.uncheck();
      //           } else {
      //             //多选后单选,只选中当前
      //             removeList.forEach((object) => object.uncheck());
      //             target.check();
      //           }
      //           break;
      //       }
      //     }
      //   }
      // }
      // this.renderAll();
    },
    'mouse:down': function (options) {
      const evt = options.e;
      this.isDragging = true;
      this.selection = false;
      this.lastPosX = evt.clientX;
      this.lastPosY = evt.clientY;
      // if (event.altKey === true) {
      //   this.isDragging = true;
      //   this.selection = false;
      //   this.lastPosX = event.clientX;
      //   this.lastPosY = event.clientY;
      // }
    },
    'mouse:move': function (options) {
      if (this.isDragging) {
        const event = options.e;
        const xOffset = event.clientX - this.lastPosX;
        const yOffset = event.clientY - this.lastPosY;
        this.relativePan(new fabric.Point(xOffset, yOffset));
        this.lastPosX = event.clientX;
        this.lastPosY = event.clientY;
        if (!this.transTrack) {
          this.transTrack = [];
        }
        this.transTrack.push({
          type: 'pan',
          value: {
            xOffset: xOffset,
            yOffset: yOffset
          }
        });
      }
    }
  });
};

//复原
fabric.Canvas.prototype.reset = function() {
  if (!this.transTrack) {
    return;
  }
  for (let i = this.transTrack.length - 1; i >= 0; i--) {
    const current = this.transTrack[i];
    switch (current.type) {
      case 'zoom':
        this.zoomToPoint(current.value.point, this.getZoom() + current.value.zoomOffset);
        break;
      case 'pan':
        this.relativePan(new fabric.Point(-current.value.xOffset, -current.value.yOffset));
        break;
      default:
        break;
    }
  }
  this.transTrack = [];
};

fabric.Canvas.prototype._addSpecialAreaLegend = function (enterprise = {}) {
  if (enterprise.exhibitsSpecialAreaCode
    && !this.specialAreaLegend[enterprise.exhibitsSpecialAreaCode]) {
    this.specialAreaLegend[enterprise.exhibitsSpecialAreaCode] = {
      code: enterprise.exhibitsSpecialAreaCode,
      name: enterprise.exhibitsSpecialArea,
      color: enterprise.exhibitsSpecialAreaColor
    };
  }
  const legends = [];
  Object.values(this.specialAreaLegend).forEach(item => {
    legends.push({
      color: item.color,
      text: item.name
    });
  });
  this.addLegend(legends);
};

fabric.Canvas.prototype._removeSpaeicalAreaLegend = function() {
  const allExhibitions = this._objects.filter(item => item.planInfo && item.opacity !== 0);
  const allSpcialAreaCodes = allExhibitions.map(item => item.planInfo.enterprise.exhibitsSpecialAreaCode);
  const keys = Object.keys(this.specialAreaLegend);
  keys.forEach(key => {
    if (allSpcialAreaCodes.indexOf(key) === -1) {
      delete this.specialAreaLegend[key];
    }
  });
  this._addSpecialAreaLegend();
};

// 为企业分配展位(标准)
fabric.Canvas.prototype.planExhibition = function(enterprise, checkedList) {
  const hasPlaned = this._objects.filter((object) =>
    object.planInfo && object.planInfo.enterprise.companyId === enterprise.companyId && object.selectable);
  let originalEnterprise = '';
  if (hasPlaned && hasPlaned.length) {
    hasPlaned.forEach((exhibition) => {
      !originalEnterprise && (originalEnterprise = exhibition.planInfo.enterprise);
      exhibition.initialize(exhibition.get('exhibition'));
      exhibition.resetPlaned();
      checkedList.push(exhibition);
    });
  }
  originalEnterprise.boothNo && (enterprise.boothNo = originalEnterprise.boothNo);
  const length = checkedList.length;
  switch (length) {
    case 1:
      planEnterprise4One(enterprise, checkedList[0]);
      break;
    default:
      planEnterprise4More(enterprise, checkedList);
      break;
  }
  this._addSpecialAreaLegend(enterprise);
  let addCodes = checkedList.map((item) => item.get('code')).sort((current, next) => next > current);
  if (originalEnterprise.deleteBoothNo) {
    const deleteCodes = originalEnterprise.deleteBoothNo.split(',');
    enterprise.deleteBoothNo = deleteCodes.filter((item) => addCodes.indexOf(item) === -1).join(',');
  }
  if (originalEnterprise.boothNo) {
    addCodes = addCodes.filter((code) => originalEnterprise.boothNo.split(',').indexOf(code) === -1);
  }
  enterprise.addBoothNo = addCodes.join(',');
  const [pavilionNumber, boothArea, floor, channel] = [[], [], [], []];
  addCodes.forEach(code => {
    const filter = checkedList.filter(item => item.code === code)[0];
    if (filter) {
      pavilionNumber.push(filter.exhibition.pavilionNumber);
      boothArea.push(filter.exhibition.boothArea);
      floor.push(filter.exhibition.floor);
      channel.push(filter.exhibition.channel);
    }
  });
  enterprise.pavilionNumber = pavilionNumber.join(',');
  enterprise.boothArea = boothArea.join(',');
  enterprise.floor = floor.join(',');
  enterprise.channel = channel.join(',');

  this.ruleValidate(enterprise);
  //this.renderAll();
};

// 反显岛型展位
fabric.Canvas.prototype.invertIslandExhibitions = function (islandExhibitions) {
  islandExhibitions.forEach(islandExhibition => {
    const splitExhibitions = islandExhibition.split;
    const enterpriseInfo = {};
    let maxEnterprise = {};
    splitExhibitions.forEach(exhibition => {
      if (!exhibition.planInfo) {
        return;
      }
      const enterprise = exhibition.planInfo.enterprise;
      if (enterpriseInfo[enterprise.companyId]) {
        enterpriseInfo[enterprise.companyId].code += "," + exhibition.code;
        enterpriseInfo[enterprise.companyId].length++;
      } else {
        enterpriseInfo[enterprise.companyId] = {
          enterprise: enterprise,
          code: exhibition.code,
          length: 1
        };
      }
    });
    if (!Object.keys(enterpriseInfo).length) {
      return;
    }
    islandExhibition.set('enterpriseInfo', enterpriseInfo);
    let maxLen = 0;
    Object.values(enterpriseInfo).filter(item => {
      if (item.length > maxLen) {
        maxEnterprise = item.enterprise;
        maxLen = item.length;
      }
    });
    const name = Object.values(enterpriseInfo).map(item => `${item.enterprise.enterpriseAbbreviation}(${item.length})`).join("");
    const enterprise = {
      companyId: new Date().getTime() + "",
      companyNameCh: name,
      enterpriseAbbreviation: name,
      chamberOfCommerce: maxEnterprise.chamberOfCommerce,
      exhibitIdOne: maxEnterprise.exhibitIdOne,
      exhibitIdOneName: maxEnterprise.exhibitIdOneName,
      exhibitIdTwo: maxEnterprise.exhibitIdTwo,
      exhibitIdTwoName: maxEnterprise.exhibitIdTwoName,
      businessDelegation: maxEnterprise.businessDelegation,
      schemeName: maxEnterprise.schemeName,
      exhibitsSpecialArea: maxEnterprise.exhibitsSpecialArea,
      exhibitsSpecialAreaCode: maxEnterprise.exhibitsSpecialAreaCode,
      exhibitsSpecialAreaColor: maxEnterprise.exhibitsSpecialAreaColor
    };
    planEnterprise4One(enterprise, islandExhibition);
    this._addSpecialAreaLegend(enterprise);
    this.renderAll();
    this.ruleValidate(enterprise);
  });
};

// 为企业分配展位(岛型)
fabric.Canvas.prototype.planIslandExhibition = function(enterprises, checkedList) {
  let [islandExhibitions, arrangeNum] = [[], 0];
  checkedList.forEach(islandExhibition => {
    islandExhibitions = islandExhibitions.concat(islandExhibition.split.filter(item => !item.planInfo));
  });
  enterprises.forEach(enterprise => {
    const recommendNum = enterprise.recommendNumber; //企业推荐数
    this.planExhibition(enterprise, islandExhibitions.filter((item, index) => index >= arrangeNum && index < arrangeNum + recommendNum));
    arrangeNum += recommendNum;
  });
  this.invertIslandExhibitions(checkedList);
  this.renderAll();
};

// 移除展位安排的企业
fabric.Canvas.prototype.removeExhibition = function(removeExhibitions) {
  let exhibitions = removeExhibitions || this.getExhibitionByPropName('fill', COLOR_PLANED_SELECTED);
  if (!exhibitions || !exhibitions.length) {
    return false;
  }
  const islandExhibitions = exhibitions.filter(item => item.type === 'island');
  this._removeIslandExhibition(islandExhibitions);
  exhibitions = exhibitions.filter(item => item.type === 'standard');
  const removerCodes = exhibitions.map(item => item.code);
  // 移除之前的安排并对剩余的已安排的展位进行调整
  exhibitions.forEach(exhibition => {
    exhibition.planInfo && delete exhibition.lastPlanInfo;
    const planInfo = exhibition.planInfo || exhibition.lastPlanInfo;
    const code = exhibition.code;
    if (planInfo && !planInfo.exhibitions) { // 单个展位分配移除
      const companyId = planInfo.enterprise.companyId;
      exhibition.initialize(exhibition.get('exhibition'));
      const leftExhibition = this._getPlanedExhibitions().filter(item => item.planInfo.enterprise.companyId === companyId);
      leftExhibition.forEach(item => {
        const enterprise = item.planInfo.enterprise;
        if (!enterprise.deleteBoothNo) {
          enterprise.deleteBoothNo = code;
        } else {
          let addArray = (enterprise.addBoothNo || '').split(',');
          if (addArray.indexOf(code) === -1 && enterprise.deleteBoothNo.split(',').indexOf(code) === -1) {
            enterprise.deleteBoothNo += `,${code}`;
          } else {
            addArray = addArray.filter((addItem) => addItem !== code);
            enterprise.addBoothNo = addArray.join(',');
          }
        }
      });
      this.ruleValidate(planInfo.enterprise);
    } else {
      const enterprise = planInfo.enterprise;
      // 获取已分配未移除的展位
      const unRemoved = planInfo.exhibitions.filter(item => removerCodes.indexOf(item.code) === -1);
      // 处理addBoothNo及deleteBoothNo的值
      if (!enterprise.deleteBoothNo) {
        enterprise.deleteBoothNo = code;
      } else {
        let addArray = (enterprise.addBoothNo || '').split(',');
        if (addArray.indexOf(code) === -1) {
          enterprise.deleteBoothNo += `,${code}`;
        } else {
          addArray = addArray.filter((item) => item !== code);
          enterprise.addBoothNo = addArray.join(',');
        }
      }
      // 调整剩余的展位分配
      planInfo.exhibitions.forEach((item) => {
        item.lastPlanInfo = item.planInfo || item.lastPlanInfo;
        item.resetPlaned();
      });
      planEnterprise4More(enterprise, unRemoved);
      this.ruleValidate(enterprise);
    }
    this.renderAll();
  });
  this._removeSpaeicalAreaLegend();
  return true;
};

// 移除岛型展位
fabric.Canvas.prototype._removeIslandExhibition = function(islandExhibitions) {
  // 岛型展位对应的分割展位
  let splitExhibitons = [];
  this.ruleValidate({}, islandExhibitions);
  islandExhibitions.forEach(exhibition => {
    splitExhibitons = splitExhibitons.concat(exhibition.split);
    exhibition.split.forEach(item => {
      //item.initialize(item.get('exhibition'));
      item.resetPlaned();
    });
    //exhibition.initialize(exhibition.get('exhibition'));
    exhibition.resetPlaned();
  });
  this.renderAll();
};

fabric.Canvas.prototype.getExhibitionByCodes = function(codes) {
  return this._objects.filter((object) => {
    const code = object.get('code');
    if (!code) {
      return false;
    }
    return codes.indexOf(code) !== -1;
  });
};

// 用于获取保存的分配的展位数据
fabric.Canvas.prototype._getPlanedExhibitions = function () {
  // 获取当前方案安排的展位数据(排除不能操作的,岛型展位可见的,反显的数据)
  return this._objects.filter(object => object.planInfo && !object.isNotData && !object.isInverted);
};

// 用于获取显示的安排展位
fabric.Canvas.prototype._getShowPlanedExhibitions = function () {
  return this._objects.filter(object => object.planInfo && object.opacity !== 0);
};

// 添加图例
fabric.Canvas.prototype.addLegend = function(legends) {
  // 移除已存在的图例
  this._objects
  .filter(item => item.type === 'legend')
  .forEach(legend => this.remove(legend));
  const start = (this.width - LEGEND_WIDTH * legends.length * 2) / 2;
  let lastTextWidth = 0;
  let canvasWidth = this.width;
  let firstLeftValue = start + lastTextWidth + 32;
  const ctx = this.contextContainer;
  legends.forEach((item, index) => {
    let leftValue = start + lastTextWidth + 32;
    let legendLeft = start + lastTextWidth;
    let currentItemWidth = leftValue + LEGEND_WIDTH + ctx.measureText(item.text).width;
    let top = 15;
    if (currentItemWidth >= canvasWidth) {
      top = 35;
      leftValue = firstLeftValue;
      legendLeft = firstLeftValue - 32;
      firstLeftValue += LEGEND_WIDTH + ctx.measureText(item.text).width + 6;
    }
    const legend = new Legend(item.color, item.text, legendLeft, top);
    const channelText = new fabric.Text(item.text, {
      top: top + 1,
      left: leftValue,
      selectable: false,
      type: 'legend',
      fontSize: 10 //Math.floor(channel.width / (item.channelCode.length))
    });
    lastTextWidth += LEGEND_WIDTH + ctx.measureText(item.text).width + 6;
    this.add(legend);
    this.add(channelText);
  });
  this.renderAll();
};

fabric.Canvas.prototype.changeShowModel = function(showModel) {
  const planedExhibitions = this._getShowPlanedExhibitions();
  const fillColors = [];
  planedExhibitions.concat(this._objects.filter(item => item.planInfo && item.isNotData))
  .forEach((exhibition) => {
    const planInfo = exhibition.planInfo;
    planInfo.showModel = showModel;
    const fillColor = exhibition.fill;
    /*exhibition.initialize(exhibition.get('exhibition'));
    exhibition.plan(planInfo);*/
    if (showModel === 1) {
      exhibition.set('fill', fillColor === COLOR_CONFLICT ? COLOR_CONFLICT : COLOR_PLANED);
    } else {
      const show = MODEL_KEY_MAP[showModel + ''];
      const value = planInfo.enterprise[show];
      exhibition.set('fill', colorGroups[show][value]);
      fillColors.push(colorGroups[show][value]);
    }
  });
  // 移除已存在的图例
  this._objects
    .filter(item => item.type === 'legend')
    .forEach(legend => this.remove(legend));
  const colors = colorGroups[MODEL_KEY_MAP[showModel + '']];
  const legends = [];
  colors && Object.keys(colors).forEach((key) => {
    if (fillColors.indexOf(colors[key]) + 1) {
      legends.push({
        color: colors[key],
        text: key
      });
    }
  });
  this.addLegend(legends);
  // this.renderAll();
};

fabric.Canvas.prototype._getSpecialAreaColor = function(enterprise) {
  if (enterprise.exhibitsSpecialAreaCode) {
    const legend = this.specialAreaLegend[enterprise.exhibitsSpecialAreaCode];
    legend && (enterprise.exhibitsSpecialAreaColor = legend.color);
  }
};

// 反显企业分配信息
fabric.Canvas.prototype.invertPlaned = function(enterprise, exhibitions) {
  exhibitions.forEach(item => {
    item.resetPlaned();
    item.set('isInverted', undefined);
  });
  if (!exhibitions || !exhibitions.length) {
    return;
  }
  this._getSpecialAreaColor(enterprise);
  if (exhibitions.length === 1) {
    planEnterprise4One(enterprise, exhibitions[0]);
  } else {
    planEnterprise4More(enterprise, exhibitions);
  }
  this._addSpecialAreaLegend(enterprise);
  this.ruleValidate(enterprise);
  this.renderAll();
};

// 反显其他关联方案数据,反显的数据不触发规则校验,只读
fabric.Canvas.prototype.invertOtherPlaned = function(enterprise, exhibitions) {
  if (!exhibitions || !exhibitions.length) {
    return;
  }
  this._getSpecialAreaColor(enterprise);
  if (exhibitions.length === 1) {
    planEnterprise4One(enterprise, exhibitions[0]);
  } else {
    planEnterprise4More(enterprise, exhibitions);
  }
  exhibitions.forEach(exhibition => {
    exhibition.set('selectable', false);
    exhibition.set('hoverCursor', 'not-allowed');
    exhibition.set('isInverted', true);
  });
  this._addSpecialAreaLegend(enterprise);
  this.renderAll();
};

//方案对比
fabric.Canvas.prototype.contrastSchema = function (schema) {
  const legends = {}; // 对比图例
  // 移除反显的数据
  const invertExhibitions = this._objects.filter(item => item.isInverted);
  invertExhibitions.forEach(item => {
    item.resetPlaned();
    item.set('isInverted', undefined);
  });
  // 显示对比方案的数据,无冲突的lightblue标记,冲突红色高亮显示
  const paSchemeEnterpriseList = schema.paSchemeEnterpriseList;
  paSchemeEnterpriseList.forEach((item) => {
    const exhibitions = this.getExhibitionByCodes(item.boothNo.split(','));
    const filterExh = exhibitions.filter((object) => !object.planInfo);
    item.schemeName = schema.schemeName;
    filterExh.length === 1 ? planEnterprise4One(item, filterExh[0]) : planEnterprise4More(item, filterExh);
    exhibitions.filter((object) => object.planInfo).forEach((object) => {
      if (object.planInfo.enterprise.companyId === item.companyId) {
        object.set('fill', 'lightblue');
        !legends['contrast'] && (legends['contrast'] = { color: 'lightblue', text: '对比方案' });
      } else {
        object.set('fill', COLOR_CONFLICT);
        !legends['conflict'] && (legends['conflict'] = { color: COLOR_CONFLICT, text: '方案冲突' });
        object.set('contrastSchema', {
          "schemeName": schema.schemeName,
          "companyNameCh": item.companyNameCh,
          "businessDelegation": item.businessDelegation,
          "chamberOfCommerce": item.chamberOfCommerce
        });
      }
      object.set('isConstrasted', true);
      object.set('selectable', false);
    });
  });
  // 统一原有方案的颜色
  const color = randomColor();
  this._objects.filter((object) => {
    return object.planInfo
      && object.planInfo.enterprise.schemeId !== schema.schemeId
      && object.fill !== COLOR_CONFLICT;
  }).forEach((item) => {
    item.set('fill', color);
    item.set('isConstrasted', true);
    item.set('selectable', false);
    !legends['original'] && (legends['original'] = {
      color: color,
      text: '当前方案'
    });
  });
  // 添加方案标识图例
  this.addLegend(Object.values(legends));

  this.renderAll();
};

fabric.Canvas.prototype.removeContrast = function (schemeId) {
  const filterExhibitions
    = this._objects.filter((object) =>
    object.planInfo // 展位已分配企业
    && object.planInfo.enterprise.schemeId
    && object.planInfo.enterprise.schemeId !== schemeId // 不是当前方案分配的企业
    && !object.isInverted // 不是其他方案反显的数据
  );
  filterExhibitions.forEach((item) => {
    item.resetPlaned();
  });
  this._objects.filter((object) => object.contrastSchema).forEach((item) => {
    item.set('contrastSchema', undefined);
  });

  this._objects.filter((object) => object.isConstrasted).forEach((item) => {
    item.set('selectable', fabric.Object.prototype.selectable);
  });

  this.renderAll();
};

fabric.Canvas.prototype.onQuery = function (searchForm) {
  delete searchForm.exhibitionHall;
  const keys = Object.keys(searchForm);
  if (!keys.length) {
    return 1;
  }
  const compareFunc = {
    code: (searchCode, object) => object.code && object.code.indexOf(searchCode) + 1,
    companyNameCh: (searchName, object) => object.planInfo && object.planInfo.enterprise.companyNameCh.indexOf(searchName) !== -1,
    cantonCode: (cantonCode, object) => object.planInfo && object.planInfo.enterprise.cantonCode && object.planInfo.enterprise.cantonCode.indexOf(cantonCode) !== -1
  };
  const filterExhibitions = this._objects.filter((object) => {
    let flag = true;
    Object.keys(searchForm).forEach((key) => {
      if (!searchForm[key]) {
        return;
      }
      flag = flag && compareFunc[key](searchForm[key], object);
    });
    return flag;
  });
  filterExhibitions.forEach((exhibition) => {
    exhibition.set('fill', COLOR_FILTER);
  });
  this.renderAll();
  return filterExhibitions.length;
};

fabric.Canvas.prototype.onResetQuery = function() {
  // this.getExhibitionByPropName('fill', COLOR_FILTER)
  this._getShowPlanedExhibitions()
  .concat(this.getExhibitionByPropName('fill', COLOR_FILTER))
  .forEach((object) => {
    if (object.planInfo) {
      const enterprise = object.planInfo.enterprise;
      object.set('fill', object.adjustColor || enterprise.exhibitsSpecialAreaColor || COLOR_PLANED);
    } else {
      object.set('fill', object.selectable ? COLOR_DEFAULT : COLOR_DISABLED);
    }
  });
  this._addSpecialAreaLegend();
  this.renderAll();
};

// 获取企业展位安排的信息
fabric.Canvas.prototype.getEnterpeisePlanedData = function() {
  const planedExhibitions = this._getPlanedExhibitions();
  const result = {}; // key: 企业ID value: 企业信息对象
  planedExhibitions.forEach((exhibition) => {
    const keys = Object.keys(result);
    const enterprise = exhibition.planInfo.enterprise;
    if (keys.indexOf(enterprise.companyId) === -1) {
      result[enterprise.companyId] = enterprise;
    }
  });
  return result;

};

// 获取可操作且未安排企业的展位
fabric.Canvas.prototype.getAbleExhibitions = function (sort = 'esc') {
  return this._objects.filter(item => item.code && item.selectable && !item.planInfo)
  .sort((current, next) =>
    sort === 'esc' ? current.code - next.code : next.code - current.code);
};

// 显示模式切换
fabric.Canvas.prototype.changePlanedShowModel = function (planedModel) {
  const planedExhibitions = this._getShowPlanedExhibitions();
  planedExhibitions.forEach((exhibition, index) => {
    const planInfo = exhibition.planInfo;
    if (index === planedExhibitions.length - 1) {
      planInfo.isLast = true;
    } else if (planInfo.exhibitions) {
      const codes = planInfo.exhibitions.map(item => item.code);
      if (codes.indexOf(planedExhibitions[index + 1].code) === -1) {
        planInfo.isLast = true;
      }
    }
    planInfo.planedModel = planedModel;
    exhibition.set('selectable', false);
    exhibition.set('hoverCursor', 'not-allowed');
    exhibition.set('isInverted', true);
    const options = {
      'selectable': exhibition.get('selectable'),
      'hoverCursor': exhibition.get('hoverCursor'),
      'isInverted': exhibition.get('isInverted')
    };
    exhibition.initialize(exhibition.get('exhibition'));
    exhibition.setOptions(options);
    exhibition.plan(planInfo, planInfo.enterprise.exhibitsSpecialAreaColor || COLOR_PLANED);
  });
  this.renderAll();
};

// 获取规则检验数据结果
fabric.Canvas.prototype.getRuleRelatedData = function () {
  this.ruleRelatedData.allValidateRule = INSPECTION_RULES;
  Object.keys(this.ruleRelatedData.violateRuleList).forEach(key => {
    if (!this.ruleRelatedData.violateRuleList[key]) {
      delete this.ruleRelatedData.violateRuleList[key];
    }
  });
  return this.ruleRelatedData;
};

// 主副通道规则校验(品牌展位)
fabric.Canvas.prototype.mainChannelValidate = function (showChannelvalidate) {
  let result = false;
  // 获取当前展区安排的企业
  const planedExhibitions = this._objects.filter(object => object.selectable && object.planInfo);
  if (showChannelvalidate) {
    planedExhibitions.forEach(item => {
      const violateRules = item.get('violateRules');
      if (violateRules && violateRules['channel']) {
        item.set('fill', item.planInfo.enterprise.exhibitsSpecialAreaColor || COLOR_PLANED);
      }
    });
    remove(this, 'mainChannel', planedExhibitions, ['channel']);
    this.renderAll();
    return true;
  }
  // 展厅主通道
  const mainChannels = this.channels.filter(channel => channel.type === 1);
  // 展厅辅主通道
  const subChannels = this.channels.filter(channel => channel.type === 2);

  // 划分已分配展位:主通道展位、副主通道展位、其他展位
  const [mains, subs, others] = [[], [], []];
  planedExhibitions.filter(exhibition => {
    // 是否主通道企业
    const isMain = mainChannels.some(channel => {
      return isAdjacentbetweenExhibitionAndChannel(exhibition, channel);
    });
    if (isMain) {
      mains.push(exhibition);
      return;
    }
    // 是否辅主通道企业
    const isSub = subChannels.some(channel => {
      return isAdjacentbetweenExhibitionAndChannel(exhibition, channel);
    });
    if (isSub) {
      subs.push(exhibition);
      return;
    }
    // 其他通道企业
    others.push(exhibition);
  });

  // 企业评分展位安排规则:主通道 > 副主通道 > 其他展位
  const dealChannelValidate = (exhibition) => {
    const enterprise = exhibition.planInfo.enterprise;
    const higher = subs.concat(others).filter(item => item.planInfo.enterprise.score > enterprise.score);
    if (higher.length) {
      addRules(this, "mainChannel", higher.concat([exhibition]), "channel");
      higher.concat([exhibition]).forEach(item => {
        item.set('fill', COLOR_CONFLICT);
      });
      result = true;
    }
  };

  // 副主通道展位和其他展位中评分高于主通道的
  mains.forEach(exhibition => {
    dealChannelValidate(exhibition);
  });

  // 其他展位高于副主通道
  subs.forEach(exhibition => {
    dealChannelValidate(exhibition);
  });

  this.renderAll();

  return result;
};

// 企业安排规则检验(安排阶段)
fabric.Canvas.prototype.ruleValidate = function (enterprise, islandExhibitions = []) {
  const _this = this;
  const companyId = enterprise.companyId;
  const isBrand = schemaInfo.exhibitionProperty === '品牌展位';// 是否品牌展位
  const exhibitions = _this._objects.filter(item => item.selectable && item.planInfo && item.planInfo.enterprise.companyId === companyId);
  const validateFunc = {
    // 检查安排进度
    checkProgressRule: function () {
      const recommendNum = enterprise.recommendNumber || enterprise.recommendedQuantity; // 企业推荐展位数
      const actualNum = exhibitions.length;// 实际安排展位
      if (actualNum === 0 || actualNum === recommendNum) {
        remove(_this, companyId, exhibitions, ['less', 'more']);
      } else if (actualNum > recommendNum) { // 大于推荐展位数,严禁,不可提交
        addRules(_this, companyId, exhibitions, 'more');
        remove(_this, companyId, exhibitions, ['less']);
      } else if (actualNum < recommendNum) { // 小于推荐展位数,非严禁,可提交
        addRules(_this, companyId, exhibitions, 'less');
        remove(_this, companyId, exhibitions, ['more']);
      }
    },
    // 检查是否重复安排
    isRepeatArranged: function () {
      const enterpriseData = _this.ruleValidateData.paSchemeDetailList; //已公布的方案明细
      const currentCode = exhibitions.map(item => item.code); // 当前安排的展位
      const existenceCode = enterpriseData.map(item => item.boothNo); // 已安排且公布的展位
      for (let i = 0; i < currentCode.length; i++) {
        if (existenceCode.indexOf(currentCode[i]) !== -1) {
          addRules(_this, companyId, exhibitions, 'repeat');
          return;
        }
      }
      remove(_this, companyId, exhibitions, ['repeat']);
    },
    /*// 检查奖惩处理名单
    rewardAndPubnish: function () {
      // 判断当前企业是否在黑名单中
      companyId && _this.getBlackInfo(companyId).then(res => {
        res.isBlack === '0' ? remove(_this, companyId, exhibitions, ['pubnish']) : addRules(_this, companyId, exhibitions, 'pubnish');
      });
    },*/
    // 展位安排异常
    planedException: function () {
      // 一个岛型展位安排给两家或两家以上企业
      const planedIslandExhibitions = exhibitions.filter(item => item.type === 'island');
      planedIslandExhibitions.forEach(exhibition => {
        const enterpriseInfo = exhibition.get('enterpriseInfo');
        if (enterpriseInfo && Object.keys(enterpriseInfo).length > 1) {
          addRules(_this, companyId, [exhibition], 'exceptionIsland');
        }
      });
      if (islandExhibitions.length > 0) {
        islandExhibitions.forEach(exhibition => {
          remove(_this, exhibition.planInfo.enterprise.companyId, [exhibition], ['exceptionIsland']);
        });
      }
      // 同一期展位物理不相邻
      if (exhibitions.length > 1) {
        const positionShips = exhibitions.map(itme => itme.positionShip);
        if (!positionShips.some(item => !item) && positionShips.filter(item => item.x === 0 && item.y === 0).length === 1) {
          remove(_this, companyId, exhibitions, ['exceptionNotAdjacent']);
        } else {
          addRules(_this, companyId, exhibitions, 'exceptionNotAdjacent');
        }
      } else {
        remove(_this, companyId, exhibitions, ['exceptionNotAdjacent']);
      }

      // 展区的品牌展位上限与下限,品牌展位安排触发
      if (isBrand) {
        const [downLimit, upLimit] = [0, 999];
        // 当前品牌企业所安排的品牌展位数
        const brandNum = exhibitions.length;
        if (!brandNum) {
          return;
        }
        if (brandNum >= downLimit && brandNum <= upLimit) {
          remove(_this, companyId, exhibitions, ['exceptionNumLimit']);
        } else {
          addRules(_this, companyId, exhibitions, 'exceptionNumLimit');
        }
      }
    },
    // 检查撤展回旋专区
    withdrawalRotation: function () {
      if (!isBrand) {
        return;
      }
      let sum = 0;
      exhibitions.forEach(item => {
        if (isBrand && item.exhibition.isCircleArea) {
          addRules(_this, companyId, [item], 'withdraw');
          sum++;
        }
      });
      if (!sum) {
        remove(_this, companyId, [], ['withdraw']);
      }
    },
    // 检查专区展位企业安排情况
    exhibitionBooth: function () {
      exhibitions.forEach(exhibition => {
        // 展位的预安排企业
        const filter = _this.ruleValidateData.paPreArrangedEnterprisesList.filter(item => item.positionNumber === exhibition.code)[0];
        if (!filter) {
          return;
        }
        if (filter.companyId === companyId) {
          remove(_this, companyId, [exhibition], ['enterprise']);
        } else {
          addRules(_this, companyId, [exhibition], 'enterprise');
          exhibition.set('fill', COLOR_CONFLICT);
        }
      });
    },
    // 品牌粘连检查(分配一非品牌展位触发的规则)
    brandAdhesion: function () {
      if (isBrand) {
        return;
      }
      // 获取企业已分配且提交的品牌展位信息
      const brandExhibitions = _this._objects.filter(object =>
        !object.selectable
        && object.planInfo
        && object.planInfo.enterprise.companyId === companyId
        && object.planInfo.enterprise.boothType === '品牌展位'
      );
      if (!brandExhibitions.length) {
        return;
      }
      // 获取品牌粘连的企业
      const adhesionExhibitions = exhibitions.map(exhibition => {
        return brandExhibitions.some(brandExhibition => {
          const commonPoints = positionRelationship4Two(exhibition, brandExhibition);
          return Object.keys(commonPoints).length > 0;
        });
      });
      const adhesionNum = adhesionExhibitions.length;
      // 判断当前分配企业是否申请展位粘连是否通过
      if (enterprise.stickyBrandExamineLog) { // pass
        adhesionNum !== enterprise.adhesionNumber ? addRules(_this, companyId, exhibitions, 'adhesion') : remove(_this, companyId, exhibitions, ['adhesion']);
      } else { // reject
        adhesionNum ? addRules(_this, companyId, exhibitions, 'adhesion') : remove(_this, companyId, exhibitions, ['adhesion']);
      }
    },
    // 安排专区与预设专区不一致
    specialAreaValidate: function() {
      const actual = enterprise.exhibitsSpecialAreaCode;
      exhibitions.forEach(exhibition => {
        if (!exhibition.exhibition.specialAreaCode) {
          return;
        }
        if (exhibition.exhibition.specialAreaCode === actual) {
          remove(_this, companyId, [exhibition], ['specialArea']);
        } else {
          addRules(_this, companyId, exhibition, 'specialArea');
        }
      });
    }
  };
  Object.keys(validateFunc).forEach(key => {
    if (_this.isNotValidated && _this.isNotValidated.indexOf && _this.isNotValidated.indexOf(key) !== -1) {
      return;
    }
    validateFunc[key]();
  });
};

// 在线安排时判断当前展位是否已安排
fabric.Canvas.prototype.getOnlineSelectedCheck = function () {
  let selectedList = this.getExhibitionByPropName('fill', COLOR_PLANED_SELECTED);
  return selectedList;
};

export const fabric4Ex = fabric;
