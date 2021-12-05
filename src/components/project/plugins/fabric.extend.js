/**
 * extends of fabric for online distribution of  exhibition position
 **/

/**
 * basic settings of fabric.Object
 **/

// fabric.Object.prototype.hasControls = false; //去掉控制
// fabric.Object.prototype.lockMovementX = true; //横行移动锁定
// fabric.Object.prototype.lockMovementY = true; //纵向移动锁定
import $ from 'jquery';
fabric.Object.prototype.hasRotatingPoint = false; // 去掉旋转
/**
 *  user-defined classes
 **/

const Exhibition = fabric.util.createClass(fabric.Rect, {
  type: 'exhibition',
  initialize: function (exhibition) {
    const defaultOption = {
      fill: exhibition.color, // 默认填充色
      stroke: 'black', // 文字色
      strokeDashArray: [],
      hoverCursor: 'pointer',
      width: exhibition.width,
      height: exhibition.height,
      left: exhibition.xCoord,
      top: exhibition.yCoord,
      level: exhibition.level ? exhibition.level : '',
      skewX: exhibition.vertexCoord, // 设置偏移量
      scaleX: exhibition.scaleX ? exhibition.scaleX : 1,
      scaleY: exhibition.scaleY ? exhibition.scaleY : 1,
      zoomX: exhibition.zoomX ? exhibition.zoomX : 0.25,
      zoomY: exhibition.zoomY ? exhibition.zoomY : 0.25,
      hasBorders: exhibition.hasBorders, // 去掉边框
      hasControls: exhibition.hasControls, // 去掉控制
      lockMovementX: exhibition.lockMovementX, // 横行移动锁定
      lockMovementY: exhibition.lockMovementY, // 纵向移动锁定
      selectable: exhibition.selectable ? 'true' : exhibition.type !== '1' ? 'true' : false,
      // selectable: exhibition.selectable ? 'true' : false,
      hasRotatingPoint: false
    };
    this.callSuper('initialize', defaultOption);
    // console.log(exhibition);
    this.set('exhibition', exhibition);
    this.set('code', exhibition.code ? exhibition.code : '');
    this.set('name', exhibition.name ? exhibition.name : '');
    this.set('ename', exhibition.ename ? exhibition.ename : '');
    this.set('sid', exhibition.sid ? exhibition.sid : '');
    this.set('planInfo', null);
  },
  // toObject: function () {
  //     return fabric.util.object.extend(this.callSuper('toObject'), {
  //         exhibition: this.get('exhibition'),
  //         code: this.get('code'),
  //         name: this.get('name')
  //     });
  // },
  _render: function (ctx) {
    this.callSuper('_render', ctx);
    this.set('svgTrack', []);
  },
  _toSVG: function () {
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

const Exhibitext = fabric.util.createClass(fabric.Text, {
  type: 'exhibition',
  initialize: function (exhibition) {
    // let text = new fabric.Text('展\n览\n展\n期', { left: 2200, top: 1100, fontSize: 20 });
    // this.canvas.add(text);
    const defaultOption = exhibition.name ? exhibition.name : '';
    // const defaultOption = {
    //   fill: '#000', // 默认填充色
    //   stroke: 'black', // 文字色
    //   strokeDashArray: [],
    //   name: exhibition.name,
    //   hoverCursor: 'pointer',
    //   width: exhibition.width,
    //   height: exhibition.height,
    //   left: exhibition.xCoord,
    //   top: exhibition.yCoord,
    //   skewX: exhibition.vertexCoord, // 设置偏移量
    //   hasBorders: exhibition.hasBorders, // 去掉边框
    //   hasControls: exhibition.hasControls, // 去掉控制
    //   lockMovementX: exhibition.lockMovementX, // 横行移动锁定
    //   lockMovementY: exhibition.lockMovementY, // 纵向移动锁定
    //   selectable: true,
    //   hasRotatingPoint: false
    // };
    this.callSuper('initialize', defaultOption);
    this.set('left', exhibition.xCoord);
    this.set('top', exhibition.yCoord);
    this.set('hasBorders', exhibition.hasBorders);
    this.set('hasControls', exhibition.hasControls);
    this.set('lockMovementX', exhibition.lockMovementX);
    this.set('lockMovementY', exhibition.lockMovementY);
    this.set('scaleX', exhibition.scaleX ? exhibition.scaleX : 1);
    this.set('scaleY', exhibition.scaleY ? exhibition.scaleY : 1);
    this.set('zoomX', exhibition.zoomX ? exhibition.zoomX : 0.25);
    this.set('zoomY', exhibition.zoomY ? exhibition.zoomY : 0.25);
    this.set('fontSize', exhibition.font ? exhibition.font : 36);
    this.set('level', exhibition.level ? exhibition.level : '');
    this.set('hasRotatingPoint', false);
    this.set('selectable', exhibition.selectable ? 'true' : exhibition.level !== '2' ? 'true' : false);
    this.set('exhibition', exhibition);
    this.set('sid', exhibition.sid ? exhibition.sid : "");
    this.set('fill', exhibition.color ? exhibition.color : '#000');
    this.set('code', exhibition.code ? exhibition.code : '');
    this.set('name', exhibition.name ? exhibition.name : '');
    this.set('ename', exhibition.ename ? exhibition.ename : '');
    this.set('planInfo', null);
    // if (exhibition.color) {
    //   this.addInfo('color', exhibition.color);
    // }
  },
  _render: function (ctx) {
    this.callSuper('_render', ctx);
  }
});

Exhibitext.prototype.check = function () {
  // this.set('fill', 'red');
  this.set('checked', true);
};
Exhibitext.prototype.uncheck = function () {
  // this.set('fill', '#ffffff');
  this.set('checked', false);
};
Exhibitext.prototype.undocheck = function () {
  // this.set('fill', '#000');
  this.set('checked', false);
  this.set('planInfo', null);
};
Exhibitext.prototype.plan = function (planInfo) {
  // 解开可以自定义文字颜色
  // this.set('fill', '#000');
  // this.set('checked', false);
  // this.addInfo('color', '#000');
  this.set('fill', planInfo.color);
  this.set('checked', false);
  this.addInfo('color', planInfo.color);
};
Exhibitext.prototype.changetext = function (planInfo) {
  if (planInfo.sid) {
    this.set('sid', planInfo.sid);
    this.set('code', planInfo.code);
    this.set('name', planInfo.name);
    this.set('ename', planInfo.ename);
    this.set('text', planInfo.name);
    this.set('fill', planInfo.color);
    this.addInfo('sid', planInfo.sid);
    this.addInfo('color', planInfo.color);
    this.addInfo('code', planInfo.code);
    this.addInfo('name', planInfo.name);
    this.addInfo('ename', planInfo.ename); 
    this.addInfo('text', planInfo.name);
  } else {
    this.set('code', planInfo.code);
    this.set('name', planInfo.name);
    this.set('ename', planInfo.ename);
    this.set('text', planInfo.name);
    this.set('fill', planInfo.color);
    this.addInfo('code', planInfo.code);
    this.addInfo('color', planInfo.color);
    this.addInfo('name', planInfo.name);
    this.addInfo('ename', planInfo.ename);
    this.addInfo('text', planInfo.name);
  }
  // let info = this.get('planInfo');
  // if (info) {
  //   this.set('fill', info.color);
  // } else {
  //   this.set('fill', '#ffffff');
  // }
};
Exhibitext.prototype.addInfo = function addInfo(key, value) {
  let info = this.get('planInfo');
  let exhi = this.get('exhibition');
  if (value) {
    if (info) {
      info[key] = value;
      this.set('planInfo', info);
    } else {
      let planInfo = { color: '#000', line: '' };
      planInfo[key] = value;
      this.set('planInfo', planInfo);
    }
    exhi[key] = value;
    this.set('exhibition', exhi);
  }
  // console.log(this.get('planInfo'));
};
Exhibitext.prototype.fonts = function (planInfo) {
  this.set('fontSize', planInfo.font);
  this.addInfo('fontSize', planInfo.font);
  let info = this.get('planInfo');
  if (info) {
    this.set('fill', info.color);
  } else {
    this.set('fill', '#ffffff');
  }
};

Exhibition.prototype.check = function () {
  this.set('fill', 'lightblue');
  this.set('checked', true);
};
Exhibition.prototype.uncheck = function () {
  // this.set('fill', '#ffffff');
  this.set('checked', false);
};
Exhibition.prototype.undocheck = function () {
  let exhi = this.get('exhibition');
  if (exhi) {
    this.set('fill', exhi.color);
  } else {
    this.set('fill', '#ffffff');
  }
  this.set('checked', false);
  this.set('planInfo', null);
};
Exhibition.prototype.plan = function (planInfo) {
  this.set('fill', planInfo.color);
  this.set('checked', false);
  this.addInfo('color', planInfo.color);
};
Exhibition.prototype.dashline = function (planInfo) {
  if (planInfo.line === '1') {
    this.set('strokeDashArray', []);
  } else {
    this.set('strokeDashArray', [2, 4]);
  }
  let info = this.get('planInfo');
  if (info) {
    this.set('fill', info.color);
  } else {
    this.set('fill', '#ffffff');
  }
  this.addInfo('line', planInfo.line);
  this.set('checked', false);
};
Exhibition.prototype.fonts = function (planInfo) {
  this.addInfo('font', planInfo.font);
  let info = this.get('exhibition');
  if (info) {
    this.set('fill', info.color);
  } else {
    this.set('fill', '#ffffff');
  }
  this.set('checked', false);
};
Exhibition.prototype.skew = function (planInfo) {
  this.set('skewX', parseInt(planInfo.skew, 10)).setCoords();
};
Exhibition.prototype.changetext = function (planInfo) {
  // 不显示文字
  if (planInfo.sid) {
    this.set('sid', planInfo.sid);
    this.set('code', planInfo.code);
    this.set('name', planInfo.name);
    this.set('ename', planInfo.ename);
    this.addInfo('sid', planInfo.sid);
    this.addInfo('code', planInfo.code);
    this.addInfo('name', planInfo.name);
    this.addInfo('ename', planInfo.ename);
  } else {
    this.set('code', planInfo.code);
    this.set('name', planInfo.name);
    this.set('ename', planInfo.ename);
    this.addInfo('code', planInfo.code);
    this.addInfo('name', planInfo.name);
    this.addInfo('ename', planInfo.ename);
  }
  let info = this.get('planInfo');
  if (info) {
    this.set('fill', info.color);
  } else {
    this.set('fill', '#ffffff');
  }
};

Exhibition.prototype.addInfo = function addInfo(key, value) {
  let info = this.get('planInfo');
  let exhi = this.get('exhibition');
  if (value) {
    if (info) {
      info[key] = value;
      this.set('planInfo', info);
    } else {
      let planInfo = { color: exhi.color, line: '' };
      planInfo[key] = value;
      this.set('planInfo', planInfo);
    }
    exhi[key] = value;
    this.set('exhibition', exhi);
  }
};
Exhibition.prototype._textTrack = function (properties) {
  this.get('svgTrack').push({
    type: 'text',
    properties: properties
  });
};

// 岛型展位,每次改变状态时重绘
const IslandExhibition = fabric.util.createClass(Exhibition, {
  type: "island",
  initialize: function (exhibition) {
    this.callSuper('initialize', exhibition);
    if (exhibition.line === '0') {
      this.set('strokeDashArray', [2, 4]);
    } else {
      this.set('strokeDashArray', []);
    }
    if (exhibition.type === '2') {
      this.set('opacity', 0.9); // 增加透明度
    }
  },
  toObject: function () {
    return fabric.util.object.extend(this.callSuper('toObject'), {

    });
  },
  _render: function (ctx) {
    this.callSuper('_render', ctx);
    // 标注展位名称
    // 调整文字大小
    // if (this.exhibition.font) {
    //   ctx.font = ctx.font.replace(ctx.font, this.exhibition.font + 'px sans-serif');
    // } else {
    //   ctx.font = ctx.font.replace('10', '36');
    // }
  }
});


/**
 *  extensional methods for the class called fabric.canvas
 **/

fabric.Canvas.prototype.getExhibitionByPropName = function (name, value) {
  return this._objects.filter(function (object) {
    return object[name] && object[name] === value;
  });
};
// 添加图注
fabric.Canvas.prototype.addData = function (type, name, fill, left, top) {
  let data = {
    sid: "",
    code: "",
    type: type,
    line: "1",
    name: name,
    level: "1",
    width: 80,
    height: 80,
    color: fill,
    radius: "",
    vertexCoord: 0,
    xCoord: left,
    yCoord: top,
    isIsland: 1,
    hasBorders: true,
    hasControls: true,
    lockMovementX: false,
    lockMovementY: false
  };
  return data;
};
// 填充数据
fabric.Canvas.prototype.addStand = function (data) {
  let exhibition = {};
  if (data) {
    if (data.type === '3') {
      exhibition = new Exhibitext(data);
    } else {
      exhibition = new IslandExhibition(data);
    }
    this.add(exhibition);
  }
};
// 初始化数据
fabric.Canvas.prototype.drawGraph = function (data) {
  data.forEach(stand => {
    this.addStand(stand);
  });
};
// 重新渲染展厅文字
fabric.Canvas.prototype.changeModel = function (data) {
  let arryList = [];
  this._objects
    .filter(item => item.level === '2')
    .forEach(legend => {
      arryList.push(legend.exhibition);
      this.remove(legend);
    });
  arryList.forEach(stand => {
    this.addStand(stand);
  });
  this.renderAll();
};
fabric.Canvas.prototype.createStand = function (row, item) {
  let stand = {
    sid: row.sid ? row.sid : '',
    type: '2',
    code: row.code,
    name: row.name,
    ename: row.ename,
    line: item.line,
    level: item.level,
    width: item.width,
    height: item.height,
    color: row.areaColor,
    radius: '',
    vertexCoord: item.skewX,
    xCoord: item.left,
    yCoord: item.top,
    font: item.fontSize,
    scaleX: item.scaleX,
    scaleY: item.scaleY,
    zoomX: item.zoomX,
    zoomY: item.zoomY,
    selectable: true,
    hasBorders: true,
    hasControls: true,
    lockMovementX: false,
    lockMovementY: false
  };
  // stand.exhibition.type = '2';
  // stand.exhibition.hasBorders = stand.exhibition.hasControls = true;
  // stand.exhibition.lockMovementX = stand.exhibition.lockMovementY = false;
  // stand.hasBorders = stand.hasControls = true;
  // stand.lockMovementX = stand.lockMovementY = false;
  // stand.selectable = true;
  this.addStand(stand);
  // this.renderAll();
  return stand;
};
// 填充数据
fabric.Canvas.prototype.addStand = function (data) {
  let exhibition = {};
  if (data) {
    if (data.type === '3') {
      exhibition = new Exhibitext(data);
    } else {
      exhibition = new IslandExhibition(data);
    }
    this.add(exhibition);
  }
};
// 复原
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
fabric.Canvas.prototype.addBackground = function (url, hascom) {
  let background = { width: 1080, height: 750 };
  let picsrc = url;
  let _this = this;
  let zoom = this.getZoom() / 4;
  if (hascom) {
    if (window.navigator.msSaveBlob) {
      fabric.loadSVGFromURL(picsrc, function(objects, options) {
        var drink = fabric.util.groupSVGElements(objects, options);
        drink.set({ scaleY: _this.height / background.height * 3.83, scaleX: _this.width / background.width * 3.83 });
        drink.perPixelTargetFind = true;
        drink.hasControls = drink.hasBorders = false;
        drink.lockMovementX = drink.lockMovementY = true;
        drink.selectable = false;
        drink.code = '9999';
        drink.level = '9999';
        drink.check = function () {
        };
        drink.undocheck = function () {
        };
        drink.exhibition = [];
        _this.add(drink);
      });
    } else {
      this.setBackgroundImage(picsrc, this.renderAll.bind(this), { scaleY: this.height / background.height * 3.83, scaleX: this.width / background.width * 3.83 });
    }
    this.setZoom(zoom);
  } else {
    background = { width: 1080, height: 450 };
    this.setBackgroundImage(picsrc, this.renderAll.bind(this), { scaleY: this.height / background.height / 1.73, scaleX: this.width / background.width / 1.73 });
  }
};
fabric.Canvas.prototype.delete = function (data) {
  data.forEach(item => {
    if (item.exhibition.type === '1' || item.exhibition.type === '2' || item.exhibition.type === '3') {
      this.remove(item);
    }
  });
};
fabric.Canvas.prototype.createtext = function (item, cklist) {
  let left = 1470;
  let top = 480;
  if (cklist) {
    left = cklist[0].left + cklist[0].width / 3;
    top = cklist[0].top + cklist[0].height / 3.5;
  }
  let data = {
    sid: item.sid ? item.sid : "",
    code: item.code,
    type: "3",
    line: "1",
    name: item.name,
    ename: item.ename,
    level: item.level ? item.level : "",
    font: item.font ? item.font : 36,
    width: 45,
    height: 40,
    color: item.color ? item.color : "#ffffff",
    radius: "",
    vertexCoord: -18,
    xCoord: item.left ? item.left : left,
    yCoord: item.top ? item.top : top,
    isIsland: 1,
    hasBorders: true,
    hasControls: true,
    lockMovementX: false,
    lockMovementY: false
  };
  this.addStand(data);
};
fabric.Canvas.prototype.saveinfo = function (data) {
  let newarray = [];
  for (let i = 0; i < data.length; i++) {
    let item = data[i];
    if (item && item.code !== '9999') {
      let params = {
        sid: item.exhibition.sid ? item.exhibition.sid : '',
        type: item.exhibition.type,
        code: item.code,
        name: item.name,
        line: item.line,
        level: item.level,
        width: item.width,
        height: item.height,
        color: item.fill,
        radius: '',
        vertexCoord: item.skewX,
        xCoord: item.left,
        yCoord: item.top,
        font: item.fontSize,
        scaleX: item.scaleX,
        scaleY: item.scaleY,
        zoomX: item.zoomX,
        zoomY: item.zoomY,
        hasBorders: item.exhibition.hasBorders,
        hasControls: item.exhibition.hasControls,
        lockMovementX: item.exhibition.lockMovementX,
        lockMovementY: item.exhibition.lockMovementY
      };
      newarray.push(params);
    }
  }
  // console.log(JSON.stringify(newarray));
  // localStorage.setItem('FabricData', JSON.stringify(newarray));
  return newarray;
};
fabric.Canvas.prototype.createinfo = function (list) {
  let s = [];
  for (let i = 0; i < list.length; i++) {
    let matchCode = list[i];
    let isExist = false;
    for (let m = 0; m < s.length; m++) {
      if (matchCode.name === s[m].name) {
        s[m].code += "," + matchCode.code;
        isExist = true;
        break;
      }
    }
    if (!isExist) {
      let params = {
        name: matchCode.name,
        ename: matchCode.ename,
        code: matchCode.code,
        fill: matchCode.fill
      };
      s.push(params);
    }
  }
  let itemlist = s;
  let left = 270;
  let boxtop = 180;
  let maintop = 180;
  let subtop = 230;
  for (let i = 0; i < itemlist.length; i++) {
    let item = itemlist[i];
    maintop = maintop + 150;
    subtop = subtop + 150;
    boxtop = boxtop + 150;
    if (item) {
      let box = this.addData('2', item.name, item.fill, left - 100, boxtop);
      let text = this.addData('3', item.name, '#000', left, maintop);
      let text2 = this.addData('3', item.code, '#000', left, subtop);
      this.addStand(box);
      if (item.ename) {
        text = this.addData('3', item.name + ' ' + item.code, '#000', left, maintop);
        text2 = this.addData('3', item.ename, '#000', left, subtop);
      }
      this.addStand(text);
      this.addStand(text2);
    }
  }
};
fabric.Canvas.prototype.getAllExhibitions = function (sort = 'esc') {
  return this._objects.filter((object) => {
    return object;
  }).sort((current, next) =>
      sort === 'esc' ? (current.code - next.code) && (current.name !== '') && (current.type > 1) : (next.code - current.code) && (next.name - current.name) && (next.type - current.type));
};
fabric.Canvas.prototype.getPicDatas = function (sort = 'esc') {
  return this._objects.filter(item => item.level === '1')
  .sort((current, next) =>
      sort === 'esc' ? current.code - next.code : next.code - current.code);
};
fabric.Canvas.prototype.getAllDatas = function (sort = 'esc') {
  return this._objects.filter(item => item.level === '' && item.name !== '' && item.code !== '' && item.exhibition.type !== '3')
  .sort((current, next) =>
    sort === 'esc' ? current.code - next.code : next.code - current.code);
};
fabric.Canvas.prototype.getByHeights = function (data) {
  return data.sort((current, next) => next.height - current.height);
};
fabric.Canvas.prototype.downLoad = function (name) {
  let svgXml = this.toSVG();
  let img = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(svgXml)));
  // console.log(JSON.stringify(svgXml));
  if (window.navigator.msSaveBlob) {
    // for ie 10 and later
    try {
      let blobObject = new Blob([svgXml]); 
      window.navigator.msSaveBlob(blobObject, name);
    } catch (e) {
      // console.log(e);
    }
  } else {
    let $a = document.createElement('a');
    $a.setAttribute("href", img);
    $a.setAttribute("download", name); // 需要加上后缀名
    document.body.appendChild($a);
    $a.click();
    document.body.removeChild($a);
  }
};
fabric.Canvas.prototype.endEventListener = function () {
  this.off('mouse:up');
  this.off('mouse:down');
  this.off('mouse:move');
  this.off('mouse:dblclick');
  this.off('mouse:wheel');
};
fabric.Canvas.prototype.addEventListener = function (costom) {
  this.on({
    'mouse:up': function (options) {
      if (this.isDragging) {
        this.isDragging = false;
        this.selection = true;
      } else {
        this.createEvent(options);
      }
    },
    'mouse:down': function (options) {
      const evt = options.e;
      if (costom) {
        if (evt.altKey === true) {
          this.isDragging = true;
          this.selection = false;
          this.lastPosX = evt.clientX;
          this.lastPosY = evt.clientY;
        }
      } else {
        this.isDragging = true;
        this.selection = false;
        this.lastPosX = evt.clientX;
        this.lastPosY = evt.clientY;
      }
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
    },
    'mouse:dblclick': function (options) {
      let target = options.target;
      const checkedList = this.getExhibitionByPropName('checked', true);
      checkedList.forEach(function (object) {
        if (!object.planInfo) {
          object.undocheck();
        } else {
          object.plan({ color: object.planInfo.color });
        }
        if (target.code === object.code) {
          object.set("checked", true);
        }
      });
      $('#text').click();
    },
    // 放大/缩小,需按下Ctrl键
    'mouse:wheel': function (options) {
      const event = options.e;
      // if (event.ctrlKey) {
      const delta = event.deltaY;
      const OldZoom = this.getZoom();
      let newZoom = OldZoom - delta / 400;
      if (newZoom > 1.265625) {
        newZoom = 1.265625;
      } else if (newZoom < 0.16666666666666666) {
        newZoom = 0.16666666666666666;
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
    }
  });
};
// type 1固定 2移动 3文字
fabric.Canvas.prototype.createEvent = function (options) {
  const actives = this.getActiveObjects();
  if (actives.length > 1) {
    let hasEditInfo = false;
    // console.log(actives);
    actives.forEach(function (object) {
      if (!object.get('checked')) {
        object.check();
      }
      // 当类型为2或3才能群选择
      if (object.get('exhibition').type === '1') {
        hasEditInfo = true;
      }
    });
    if (hasEditInfo) {
      this.discardActiveObject();
    }
  } else {
    let target = options.target;
    // if (target && !target.selectable) {
    //   return;
    // }
    const checkedList = this.getExhibitionByPropName('checked', true);
    if (this.getActiveObject() && !target) {
      target = this.getActiveObject();
    }
    // console.log(target);
    if (!target) {
      // 未选中,鼠标点击非展位区域
      checkedList.forEach(function (object) {
        if (!object.planInfo) {
          object.undocheck();
        } else {
          object.plan({ color: object.planInfo.color });
        }
      });
    } else {
      const event = options.e;
      // 是否多选(Ctrl是否按下)
      if (event.ctrlKey) {
        if (target.checked) {
          target.uncheck();
        } else {
          target.check();
        }
      } else { // 单选
        const length = checkedList.length;
        switch (length) {
          case 0: // 初次选中
            target.check();
            break;
          default:
            // 选中后再次点击去掉选中状态
            if (checkedList.length === 1 && checkedList[0].code === target.code) {
              target.check();
            } else {
              // 多选后单选,只选中当前
              checkedList.forEach(function (object) {
                object.undocheck();
              });
              target.check();
            }
            break;
        }
      }
    }
  }
  this.renderAll();
};

fabric.Canvas.prototype.planExhibition = function (type, value, checkedList) {
  switch (type) {
    case 1:
      // 更新颜色
      checkedList.forEach(stand => {
        if (value.name === stand.name && value.name !== '' && stand.name !== '') {
          if (stand.exhibition.type !== '3') {
            stand.plan({ color: value.color });
          }
        }
      });
      break;
    case 2:
      // 更新边线
      checkedList.forEach(stand => {
        if (stand.exhibition.type === '2') {
          stand.dashline({ line: value });
        }
      });
      break;
    case 3:
      // 更新角度
      checkedList.forEach(stand => {
        if (stand.exhibition.type === '2') {
          stand.skew({ skew: value });
        }
      });
      break;
    case 4:
      // 更新字体
      checkedList.forEach(stand => {
        stand.fonts({ font: value });
      });
      break;
    case 5:
      // 更新元素
      checkedList.forEach((stand) => {
        if (value.code === stand.code && stand.level === '' && value.sid === stand.sid) {
          stand.changetext({ code: value.code, name: value.name, color: value.color, ename: value.ename });
        }
      });
      break;
    case 6:
      // 删除元素
      this.delete(value);
      break;
    case 7:
      // 保存信息,未调用
      this.saveinfo(value);
      break;
    case 8:
      // 创建文字
      this.createtext(value, checkedList);
      break;
    case 9:
      // 创建元素
      checkedList.forEach((stand) => {
        stand.changetext({ code: value.code, name: value.name, sid: value.sid, color: value.color, ename: value.ename });
      });
      break;
    case 10:
      // 创建图注
      this.createinfo(checkedList);
      break;
    default:
      break;
  }
  this.renderAll();
};

export const fabricExt = fabric;
