import Popup from '/assets/js/popup.1.0.js';
const popup = new Popup();
// 获取身份证中的出生日期
function getBirthDate(ID) {
  if (!ID) return;
  const date = ID.substr(6, 8)
  return `${date.substr(0, 4)}-${date.substr(4, 2)}-${date.substr(6, 2)}`
}
// 获取身份证中的性别
function getSex(ID) {
  if (!ID) return;
  const sex = ID.substr(16, 1) % 2
  return sex == 0 ? '女' : '男';
}
// 截取url数据 id为要截取的name
function getUrlDate(id) {
  id = id.replace(/[[]/, '\$$').replace(/[$$]/, '\\]');
  let regex = new RegExp('[\\?&]' + id + '=([^&#]*)');
  let results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' ')) || '';
}
// 检测是否为移动端
function isMobile() {
  return navigator.userAgent.match(/mobile/i)
  // if (navigator.userAgent.match(/mobile/i)) {
  //   return
  //   //业务层代码
  //   window.location.href = '/bootstrap/view/template.html'
  // }
}
// 检测是否为微信端
function isWX() {
  return /MicroMessenger/i.test(navigator.userAgent);
  // if (navigator.userAgent.match(/mobile/i)) {
  //   return
  //   //业务层代码
  //   window.location.href = '/bootstrap/view/template.html'
  // }
}
// clickIndex 得到点击事件的索引
function getClickIndex(el, elFather, elFatherName) {
  const index = elFather.index(getFather(el))
  return index;
  // 递归得到父组件
  function getFather(el) {
    let element = el;
    let name = element.className;
    if (name == elFatherName) return element;
    return getFather(element.parentElement)
  }
}
// 判断该年份是否为闰年 number
function judgeYear(year) {
  let leapYear = false
  if (year % 100 == 0) {
    leapYear = year % 400 == 0
  } else {
    leapYear = year % 4 == 0
  }
  return leapYear
}
//模糊搜索
function fuzzySearch(query, data) {
  query = query.toLowerCase();
  return data.filter(item => {
    const itemText = item.toLowerCase();
    return itemText.includes(query);
  });
}
function handleStatus({ status, element, errorElement, n: name, length, str }) {
  /**
   * @param {status} 状态
   * @param {element} 改变的元素
   * @param {errorElement} 改变元素的报错
   * @param {name} 名称
   * @param {length} 名称的位数 
   * @param {minLen} 最小的位数
   * @param {maxLen} 最多的位数
   * 
  */
  let text;
  switch (status) {
    case 'success':
      element && element.removeClass('valid');
      errorElement && errorElement.removeClass('error')
      // return true
      break;
    case 'null':
      text = `* 请填写${name}`
      break;
    case 'error':
      text = `* 请填写正确的${name}`
      if (name == '出生日期') {
        text = str
      }
      break;
    case 'short':
      text = `* 请填写${name}不少于${length}位`
      if (name == '手机号码') {
        text = '* 手机号码不得少于11位'
      }
      break;
  }
  console.log('handleStatus-------', element, status, text, name)

  if (status == 'success') return true;
  element && element.addClass('valid');
  if (!errorElement) {
    return popup?.msg(text, 2000);
  } else {
    errorElement.text(text)
    errorElement.addClass('error')
  }
  return false
}
function add0(m) {
  return m < 10 ? '0' + m : m
}
const checkBox = {
  check: function ({ id, myReg, len }) {
    /**
     * myReg: required 必填
     * 
    */
    let a;
    if (id?.length == 0) {
      a = 'null'
    } else if (len && id?.length < len) {
      a = 'short'
    } else if (myReg && myReg.test(id)) {
      a = 'success'
    } else {
      a = 'error'
    }
    return this.status(a)
  },
  // 检测是否有值x
  checkNull: function ({ value: id, len }) {
    const myReg = /^.+$/;
    return this.check({ id, myReg, len })
  },
  // 检测自定义值 
  checkUserDefined: function ({ value: id, myReg, len }) {
    return this.check({ id, myReg, len });
  },
  // 检测公司名称
  checkCompanyName: function ({ value: id, len }) {
    const myReg = /^[\u4e00-\u9fa5\w\s()（）]{2,}$/;
    return this.check({ id, myReg, len })
  },
  // 检测该值
  // 检测是否为统一社会信用代码
  checkCompanyCode: function ({ value: id = '' }) {
    // const length = 18;
    const myReg = /[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}/i;
    return this.check({ id, myReg, len: 18 })
  },
  // phone手机号码
  checkPhone: function ({ value: id }) {
    // const myReg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
    // const myReg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[01235678]|18[0-9]|19[0-9])\d{8}$/;
    const myReg = /^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/;
    return this.check({ id, myReg, len: 11 })
  },
  // email
  checkEmail: function ({ value: id }) {
    const myReg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    return this.check({ id, myReg })
  },
  // name
  checkName: function ({ value: id, type = 'chinese' }) {
    /**
     * @param {type} chinese  中文
     * @param {type} english  英文
     * @param {type} chinese_and_english 英文和中文
     * @param {type} chinese_or_english 纯英文/纯中文
    */
    // 中文 /^[\u4e00-\u9fa5]+$/
    // 中文中带· /^[\u4e00-\u9fa5]+·[\u4e00-\u9fa5]$/
    // 中文中带·和纯中文都能通过 /^[\u4e00-\u9fa5]+[·]?[\u4e00-\u9fa5]+$/g
    // /^[\u4e00-\u9fa5]+(?:·[\u4e00-\u9fa5]+)*$/
    // 英文 /^[a-zA-z]+$/
    // 英文/中文  /^[a-zA-Z\u4e00-\u9fa5]+$/
    // 纯英文/纯中文  /^[(\u4e00-\u9fa5) | (a-zA-Z) ]+$/
    // 中文中带·和纯英文 /^([a-zA-Z]+(\s[a-zA-Z]+)*)|^([\u4e00-\u9fa5]+(?:·[\u4e00-\u9fa5]+)*)$/
    let myReg
    switch (type) {
      case 'chinese':
        // myReg = /^[\u4e00-\u9fa5]+$/
        myReg = /^[\u4e00-\u9fa5]+[·]?[\u4e00-\u9fa5]+$/g
        break;
      case 'english':
        myReg = /^[a-zA-z]+$/;
        break;
      case 'chinese_and_english':
        myReg = /^[a-zA-Z\u4e00-\u9fa5]+$/
        break;
      case 'chinese_or_english':
        myReg = /^[(\u4e00-\u9fa5)|(a-zA-Z)]+$/
        break;
      case 'chinese_dot_or_english':
        myReg = /^([a-zA-Z]+(\s[a-zA-Z]+)*)|^([\u4e00-\u9fa5]+(?:·[\u4e00-\u9fa5]+)*)$/;
        break;
      case 'chinese_dot_or_english_dot':
        myReg = /^([a-zA-Z]+(?:·\s[a-zA-Z]+)*)|^([\u4e00-\u9fa5]+(?:·\s[\u4e00-\u9fa5]+)*)$/;
        break;
    }
    return this.check({ id, myReg })
  },
  // identity card 身份证
  checkIdCard: function ({ value: id }) {
    let a
    if (id.length == 0) {
      a = 'null'
    } else if (id.length != 18) {
      a = 'short'
    } else {
      let idCard_base = id.substr(0, 17);
      let verify_code = id.substr(17, 1);
      let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      let verify_code_list = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
      let total = 0;
      for (let i = 0; i < 17; i++) {
        let index = i;
        total += idCard_base.substr(index, 1) * factor[index];
      }
      let mod = total % 11;
      a = verify_code == verify_code_list[mod] ? 'success' : 'error'
    }
    return this.status(a)
  },
  // passport 护照
  checkPassport: function ({ value: id }) {
    const myReg = new RegExp(`^(?:[A-Z0-9]{7,15}|[0-9]{7,15})$`);
    //7-15位，大写字母+数字或者纯数字
    return this.check({ id, myReg });
  },
  // foreign passport 外国护照
  checkForeignPassport: function ({ value: id }) {
    const myReg = /^[A-Z0-9]{5,9}$/;
    //5-9位，全数字/字母+数字
    return this.check({ id, myReg });
  },
  // birth certificate 出生证明
  checkBirthCertificate: function ({ value: id }) {
    const myReg = /^[a-zA-Z0-9]{8,15}$/;
    return this.check({ id, myReg })
  },
  // 港澳台居民居住证
  checkHong_Macao_TaiWan: function ({ value: id }) {
    const myReg = /^(810000|820000|830000)/;
    return myReg.test(id) ? this.checkIdCard({ value: id }) : this.status('error');
  },
  // 港澳居民身份证 7-11位，限大写英文字母+数字或纯数字
  checkHong_Macao_CardId: function ({ value: id }) {
    const myReg = /^[A-Z0-9]{7,11}$/;
    return this.check({ id, myReg });
  },
  // 港澳居民来往内地通行证 大写“H”或“M”+8到10位数字；
  checkHong_Macao_Passer: function ({ value: id }) {
    const myReg = /^[A-Za-z]{1}[0-9]{8,10}$/;
    // const myReg = /^[H|M]{1}[0-9]{8,10}$/;
    // const myReg = /^[A-Z][0-9]{8}$|^[A-Z][0-9]{10}$/;
    return this.check({ id, myReg });
  },
  // 港澳回乡证 大写“H”或“M”+8或10位数字；
  checkHong_Macao_Return: function ({ value: id }) {
    // const myReg = /^[A-Za-z]{1}[0-9]{8,10}$/;
    const myReg = /^[HM][0-9]{8}$|^[HM][0-9]{10}$/;
    return this.check({ id, myReg });
  },
  // 港澳身份证 前面七位是大小写字母数字，中英括号中带一个数字
  checkHong_Macao_Idnum: function ({ value: id }) {
    const myReg = /^[A-Za-z0-9]{7}([\(（][0-9][\)）])?$/;
    return this.check({ id, myReg });
  },

  // 台湾居民来往内地通行证 8-10位，纯数字；
  TaiWan_Passer: function ({ value: id }) {
    const myReg = /^[0-9]{8}$|^[0-9]{10}$/;
    return this.check({ id, myReg });
  },

  // 军人证
  checkArmyMan: function ({ value: id }) {
    const myReg = /^[0-9]{6,12}$/;
    return this.check({ id, myReg });
  },
  // 车牌号校验（中国大陆）
  checkCarPlate: function ({ value: id }) {
    // 常规车牌（新能源/普通）
    const myReg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼][A-Z][A-Z0-9]{4,5}[A-Z0-9挂学警港澳]$/;
    return this.check({ id, myReg });
  },
  // 新国标电动自行车车牌（省份简称+字母+5-6位数字字母）
  checkEBikePlate: function ({ value: id }) {
    // 常规车牌（新能源/普通）
    // const myReg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼][A-Z][A-Z0-9]{5,6}$/;

    // // 临时车牌（汉字+“临”+6-7位数字字母）
    // const tempReg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼]临[A-Z0-9]{6,7}$/;

    // 临牌和新国标均可通过
    const myReg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼](?:[A-Z][A-Z0-9]{5,6}|临[A-Z0-9]{6,7})$/;

    return this.check({ id, myReg });
  },
  // 车架号校验（VIN码）
  checkVin: function ({ value: id }) {
    // 17位字母数字组合，排除IOQ
    const myReg = /^[A-HJ-NPR-Z0-9]{17}$/;
    return this.check({ id, myReg, len: 17 });
  },
  // 判断日期几岁
  judgeAge: function (birth, current) {
    /**
     * 格式：1990-02-04,不足一年按一年输出
     * @param {birth} 日期
     * @param {current} 限定的时间 时间戳
     * 
    */
    if (!birth) return 'null';
    const birthDate = new Date(birth);
    const currentDate = current ? new Date(current) : new Date()
    const birthYear = birthDate.getFullYear();
    const currentYear = currentDate.getFullYear();

    let age = currentYear - birthYear;

    let monthDiff = currentDate.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
      age -= 1;
    }
    return age;
  },
  calculateAgeInDays: function (birthDate, currentDate = new Date()) {
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const currentTime = currentDate ? new Date(currentDate) : new Date();
    const timeDiff = currentTime.getTime() - new Date(birthDate).getTime();
    const days = Math.floor(timeDiff / millisecondsPerDay);

    return days;
  },
  // 当前日期
  nowDate: function () {
    let now = new Date();
    const year = now.getFullYear()
    const month = ((now.getMonth() + 1) < 10 ? "0" : "") + (now.getMonth() + 1)
    const date = (now.getDate() < 10 ? "0" : "") + now.getDate()
    return `${year}-${month}-${date}`
  },
  status: function (num) {
    /**
     * @parsem {status}
     * success: 通过校验
     * null: 为空
     * error: 格式错误
     * short: 长度不够
     * 
    */
    switch (num) {
      case 'success':
        return 'success'
        break;
      case 'null':
        return 'null'
        break;
      case 'error':
        return 'error'
        break;
      case 'short':
        return 'short'
        break;
    }
  },
  // 判断该字符串的格式
  judgePdf: function (str) {
    const reg = /.pdf$/
    return reg.test(str)
  },
  // 检查Date格式，兼容ios低版本
  checkTime: function (time) {
    // 1. 处理无效输入
    if (time === null || time === undefined || time === "") {
      console.error('Invalid input:', time);
      return false;
    }

    // 2. 处理Date对象
    if (time instanceof Date) {
      if (isNaN(time.getTime())) {
        console.error('Invalid Date object:', time);
        return false;
      }
      return time.toISOString(); // 确保返回ISO格式
    }

    // 3. 处理字符串（兼容iOS）
    if (typeof time === 'string') {
      // 尝试直接解析
      let parsed = new Date(time);

      // 如果无效，尝试添加时区信息
      if (isNaN(parsed.getTime())) {
        // 替换空格为T（ISO格式兼容）
        const isoTime = time.trim().replace(' ', 'T');
        parsed = new Date(isoTime);

        // 仍然无效则尝试添加时区
        if (isNaN(parsed.getTime())) {
          parsed = new Date(isoTime + 'Z'); // UTC
          if (isNaN(parsed.getTime())) {
            parsed = new Date(isoTime + '+08:00'); // 中国时区
          }
        }
      }

      return isNaN(parsed.getTime()) ? false : parsed.toISOString();
    }

    // 4. 处理其他类型（如时间戳）
    try {
      const parsed = new Date(time);
      return isNaN(parsed.getTime()) ? false : parsed.toISOString();
    } catch (e) {
      console.error('Date conversion failed:', e);
      return false;
    }
  },
  addTime: function addTime(time, num = 0) {
    let value;
    const isoTime = this.checkTime(time);
    if (!isoTime) return [null, null, null, null, null, null];
    value = new Date(isoTime);
    value.setDate(value.getDate() + Number(num)); // 使用 setDate 方法来延迟日期
    let y = value.getFullYear();
    let m = add0(value.getMonth() + 1);
    let d = add0(value.getDate());
    let hh = add0(value.getHours());
    let mm = add0(value.getMinutes());
    let ss = add0(value.getSeconds());

    return [`${y}`, `${m}`, `${d}`, `${hh}`, `${mm}`, `${ss}`];
  },
  // 判断是否为整点，如果不是则取下一个整点
  changeSTime: function changeSTime(s_time) {
    // const s_time = new Date(),
    const year = s_time.getFullYear(),
      month = s_time.getMonth(),
      date = s_time.getDate(),
      hours = s_time.getHours(),
      minutes = s_time.getMinutes(),
      seconds = s_time.getSeconds();
    // 获取今日开始初的时间戳
    const startTime = new Date(s_time.toLocaleDateString()).getTime();
    const nowTime = s_time.getTime();
    data.startDate = `${year}-${month + 1 < 10 ? '0' + month + 1 : month + 1}-${date < 10 ? '0' + date : date}`;
    // one hours time
    const oneHoursTime = 1 * 60 * 60 * 1000;
    const h = (nowTime - startTime) / oneHoursTime;
    console.log('time', s_time, startTime, nowTime, oneHoursTime, h, (nowTime - startTime) % oneHoursTime, hours)
    let endTime;
    if (hours == 22 && minutes >= 30) {
      endTime = new Date(startTime + oneHoursTime * 24);
    } else if (hours > 22) {
      endTime = new Date(startTime + oneHoursTime * 24);
    } else {
      if (minutes >= 0 && minutes < 30) {
        endTime = new Date(nowTime + oneHoursTime);
      } else if (minutes >= 30 && minutes <= 59) {
        endTime = new Date(nowTime + oneHoursTime * 2);
      }
    }

    return endTime;
  },
  // 判断该年是否为闰年
  isLeapYear: function (time = new Date()) {
    const currentYear = time.getFullYear();
    const isCurrentYearLeap = (currentYear % 4 === 0 && currentYear % 100 !== 0) || (currentYear % 400 === 0);
    return isCurrentYearLeap;
  },
  formatCurrentTime: function formatCurrentTime(time = new Date(), t = '-') {
    const isoTime = this.checkTime(time);
    if (!isoTime) return [null, null, null, null, null, null];
    const now = new Date(isoTime);
    const year = now.getFullYear().toString(); // 获取年份的后两位
    const month = add0(now.getMonth() + 1); // 月份从0开始，需要+1
    const day = add0(now.getDate());
    const hours = add0(now.getHours());
    const minutes = add0(now.getMinutes());
    const seconds = add0(now.getSeconds());

    return `${year}${t}${month}${t}${day} ${hours}:${minutes}:${seconds}`;
  }

}
export { getBirthDate, getSex, getUrlDate, isMobile, getClickIndex, handleStatus, judgeYear, isWX, fuzzySearch, add0, checkBox }
