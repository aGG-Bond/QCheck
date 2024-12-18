// import popup from '/assets/js/popup.js';

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
  return sex == 0 ? '女' : '男'
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
    popup.msg(text);
    // MyAlert(text)
  } else {
    errorElement.text(text)
    errorElement.addClass('error')
  }
  return false
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
    const myReg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[01235678]|18[0-9]|19[0-9])\d{8}$/
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
        myReg =  /^([a-zA-Z]+(?:·[a-zA-Z]+)*)|^([\u4e00-\u9fa5]+(?:·[\u4e00-\u9fa5]+)*)$/;
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
  checkPassport: function ({ value: id}) {
    const myReg = new RegExp(`^(?:[A-Z0-9]{1,15}|[0-9]{1,15})$`);
    //1-15位，大写字母+数字或者纯数字
    return this.check({ id, myReg });
  },
  // birth certificate 出生证明
  checkBirthCertificate: function ({ value: id }) {
    const myReg = /^[a-zA-Z0-9]{8,15}$/;
    return this.check({ id, myReg })
  },
  // 港澳台居民居住证
  checkHong_Macao_TaiWan: function ({ value: id }) {
    const myReg = /^(81|82|83)/;
    return myReg.test(id) ? this.checkIdCard({value: id}) : this.status('error');
  },
  // 港澳居民身份证 7-11位，限大写英文字母+数字或纯数字
  checkHong_Macao_CardId: function ({ value: id }) {
    const myReg = /^[A-Z0-9]{7,11}$/;
    return this.check({ id, myReg });
  },
  // 港澳居民来往内地通行证 大写“H”或“M”+8到11位数字；
  checkHong_Macao_Passer: function ({ value: id }) {
    const myReg = /^[H|M]{1}[0-9]{8,11}$/;
    return this.check({ id, myReg });
  },
  // 台湾居民来往内地通行证 8位，纯数字；
  TaiWan_Passer: function ({ value: id }) {
    const myReg = /^[0-9]{8}$/;
    return this.check({ id, myReg });
  },

  // 军人证
  checkArmyMan: function ({ value: id }) {
    const myReg = /^[0-9]{6,12}$/;
    return this.check({ id, myReg });
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
  addTime: function addTime(time, num) {
    // let Time = new Date(time).getTime() + 86400000 * num;
    // let value = new Date(Time);
    // let y = value.getFullYear();
    // let m = ((value.getMonth() + 1) < 10 ? '0' : '') + (value.getMonth() + 1);
    // let d = (value.getDate() < 10 ? '0' : '') + value.getDate();
    // return [y, m, d]
    let value = new Date(time); // 解析时间字符串为日期对象
    value.setDate(value.getDate() + num); // 使用 setDate 方法来延迟日期
    let y = value.getFullYear();
    let m = ((value.getMonth() + 1) < 10 ? '0' : '') + (value.getMonth() + 1);
    let d = (value.getDate() < 10 ? '0' : '') + value.getDate();
    return [y, m, d];
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
  }
}
export { getBirthDate, getSex, getUrlDate, isMobile, getClickIndex, handleStatus, judgeYear, checkBox }
