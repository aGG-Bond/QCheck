# Check.js 校验工具库

这是一个包含多种数据校验和工具函数的 JavaScript 库，主要用于表单验证、身份证信息提取、URL 参数解析等常见场景。

## 主要功能模块

### 1. 身份证信息提取
- [getBirthDate(ID)](file://d:\Desktop\组件\QCheck\Check.js#L1-L5): 从身份证号中提取出生日期
- [getSex(ID)](file://d:\Desktop\组件\QCheck\Check.js#L7-L11): 从身份证号中提取性别信息

### 2. URL 和设备检测
- [getUrlDate(id)](file://d:\Desktop\组件\QCheck\Check.js#L13-L18): 从 URL 中提取指定参数值
- [isMobile()](file://d:\Desktop\组件\QCheck\Check.js#L20-L27): 检测是否为移动端访问
- [isWX()](file://d:\Desktop\组件\QCheck\Check.js#L29-L36): 检测是否为微信端访问

### 3. 工具函数
- `getClickIndex(el, elFather, elFatherName)`: 获取点击事件的索引
- [judgeYear(year)](file://d:\Desktop\组件\QCheck\Check.js#L50-L58): 判断年份是否为闰年
- [fuzzySearch(query, data)](file://d:\Desktop\组件\QCheck\Check.js#L60-L66): 模糊搜索功能
- [add0(m)](file://d:\Desktop\组件\QCheck\Check.js#L114-L116): 数字补零（小于10的数字前加0）

### 4. 核心校验对象 [checkBox](file://d:\Desktop\组件\QCheck\Check.js#L117-L496)

#### 表单校验相关
- [check({id, myReg, len})](file://d:\Desktop\组件\QCheck\Check.js#L118-L134): 基础校验函数
- [checkNull({value, len})](file://d:\Desktop\组件\QCheck\Check.js#L136-L139): 检测值是否为空
- `checkUserDefined({value, myReg, len})`: 自定义规则校验

#### 企业信息校验
- [checkCompanyName({value, len})](file://d:\Desktop\组件\QCheck\Check.js#L145-L148): 校验公司名称
- [checkCompanyCode({value})](file://d:\Desktop\组件\QCheck\Check.js#L151-L155): 校验统一社会信用代码

#### 个人身份信息校验
- [checkPhone({value})](file://d:\Desktop\组件\QCheck\Check.js#L157-L162): 校验手机号码
- [checkEmail({value})](file://d:\Desktop\组件\QCheck\Check.js#L164-L167): 校验邮箱地址
- [checkName({value, type})](file://d:\Desktop\组件\QCheck\Check.js#L169-L207): 校验姓名（支持多种类型）
- [checkIdCard({value})](file://d:\Desktop\组件\QCheck\Check.js#L209-L229): 校验身份证号码

#### 证件校验
- [checkPassport({value})](file://d:\Desktop\组件\QCheck\Check.js#L231-L235): 校验护照号码
- [checkForeignPassport({value})](file://d:\Desktop\组件\QCheck\Check.js#L237-L241): 校验外国护照
- [checkBirthCertificate({value})](file://d:\Desktop\组件\QCheck\Check.js#L243-L246): 校验出生证明
- [checkHong_Macao_TaiWan({value})](file://d:\Desktop\组件\QCheck\Check.js#L248-L251): 校验港澳台居民居住证
- [checkHong_Macao_CardId({value})](file://d:\Desktop\组件\QCheck\Check.js#L253-L256): 校验港澳居民身份证
- [checkHong_Macao_Passer({value})](file://d:\Desktop\组件\QCheck\Check.js#L258-L263): 校验港澳居民来往内地通行证
- [checkHong_Macao_Return({value})](file://d:\Desktop\组件\QCheck\Check.js#L265-L269): 校验港澳回乡证
- [checkHong_Macao_Idnum({value})](file://d:\Desktop\组件\QCheck\Check.js#L271-L274): 校验港澳身份证
- [TaiWan_Passer({value})](file://d:\Desktop\组件\QCheck\Check.js#L277-L280): 校验台湾居民来往内地通行证
- [checkArmyMan({value})](file://d:\Desktop\组件\QCheck\Check.js#L283-L286): 校验军人证

#### 车辆信息校验
- [checkCarPlate({value})](file://d:\Desktop\组件\QCheck\Check.js#L288-L292): 校验车牌号（中国大陆）
- [checkEBikePlate({value})](file://d:\Desktop\组件\QCheck\Check.js#L294-L305): 校验电动自行车车牌
- [checkVin({value})](file://d:\Desktop\组件\QCheck\Check.js#L307-L311): 校验车架号（VIN码）

#### 日期处理
- [judgeAge(birth, current)](file://d:\Desktop\组件\QCheck\Check.js#L313-L334): 计算年龄
- [calculateAgeInDays(birthDate, currentDate)](file://d:\Desktop\组件\QCheck\Check.js#L335-L342): 计算天数差
- [nowDate()](file://d:\Desktop\组件\QCheck\Check.js#L344-L350): 获取当前日期
- [addTime(time, num)](file://d:\Desktop\组件\QCheck\Check.js#L429-L443): 日期加减运算
- [changeSTime(s_time)](file://d:\Desktop\组件\QCheck\Check.js#L445-L475): 时间调整（整点处理）
- [isLeapYear(time)](file://d:\Desktop\组件\QCheck\Check.js#L477-L481): 判断是否为闰年
- [formatCurrentTime(time, t)](file://d:\Desktop\组件\QCheck\Check.js#L482-L494): 格式化当前时间

### 5. 状态处理
- `handleStatus({status, element, errorElement, n, length, str})`: 统一处理校验状态显示
- [status(num)](file://d:\Desktop\组件\QCheck\Check.js#L351-L374): 状态码转换

### 6. 文件类型判断
- [judgePdf(str)](file://d:\Desktop\组件\QCheck\Check.js#L376-L379): 判断字符串是否为 PDF 文件

### 7. 时间兼容性处理
- [checkTime(time)](file://d:\Desktop\组件\QCheck\Check.js#L381-L428): 检查并格式化时间（兼容 iOS 低版本）

## 使用方法

### 基本校验使用示例

```javascript
// 校验手机号
const phoneResult = checkBox.checkPhone({value: '13812345678'});
// 返回 'success' | 'null' | 'error' | 'short'

// 校验身份证
const idCardResult = checkBox.checkIdCard({value: '11010119900307789X'});
// 返回 'success' | 'null' | 'error' | 'short'

// 获取身份证中的出生日期
const birthDate = getBirthDate('11010119900307789X');
// 返回 '1990-03-07'

// 获取URL参数
const paramValue = getUrlDate('userId');
```

### 错误处理方式

现在 `handleStatus` 函数返回错误信息而不是直接显示，您可以根据需要在外部处理提示：

```javascript
// 使用示例
const phoneResult = checkBox.checkPhone({ value: phoneNumber });

// 处理校验结果
const statusResult = handleStatus({
  status: phoneResult,
  element: $('#phone-input'),
  n: '手机号码',
  length: 11
});

// 在外部处理提示信息
if (statusResult !== true) {
  // statusResult 包含错误信息文本
  if (typeof statusResult === 'string') {
    // 您可以在这里决定如何显示错误信息
    alert(statusResult); // 使用原生alert
    // 或者使用您自己的提示组件,如：myPopup 组件
    popup.msg(statusResult);
  }
}
```

### 状态码说明

- `success`: 校验通过
- `null`: 值为空
- `error`: 格式错误
- `short`: 长度不够

### 特点

1. **无依赖**: 不依赖任何外部库或组件，包括弹窗组件
2. **可扩展**: 错误信息返回给调用方，由调用方决定如何显示
3. **模块化**: 提供多种独立的校验函数，可根据需要选择使用
4. **兼容性好**: 时间处理函数兼容 iOS 低版本浏览器
5. **灵活配置**: 支持多种类型的校验，可根据需求自定义正则表达式

这个工具库提供了全面的数据校验功能，可以满足大部分表单验证需求，同时包含了一些常用的工具函数，方便在前端开发中使用。