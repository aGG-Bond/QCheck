## Check.js 校验工具库

这是一个包含多种数据校验和工具函数的 JavaScript 库，主要用于表单验证、身份证信息提取、URL 参数解析等常见场景。

### 主要功能模块

#### 1. 身份证信息提取
- [getBirthDate(ID)](file://d:\Desktop\组件\QCheck\Check.js#L3-L7): 从身份证号中提取出生日期
- [getSex(ID)](file://d:\Desktop\组件\QCheck\Check.js#L9-L13): 从身份证号中提取性别信息

#### 2. URL 和设备检测
- [getUrlDate(id)](file://d:\Desktop\组件\QCheck\Check.js#L15-L20): 从 URL 中提取指定参数值
- [isMobile()](file://d:\Desktop\组件\QCheck\Check.js#L22-L29): 检测是否为移动端访问
- [isWX()](file://d:\Desktop\组件\QCheck\Check.js#L31-L38): 检测是否为微信端访问

#### 3. 工具函数
- `getClickIndex(el, elFather, elFatherName)`: 获取点击事件的索引
- [judgeYear(year)](file://d:\Desktop\组件\QCheck\Check.js#L52-L60): 判断年份是否为闰年
- [fuzzySearch(query, data)](file://d:\Desktop\组件\QCheck\Check.js#L62-L68): 模糊搜索功能
- [add0(m)](file://d:\Desktop\组件\QCheck\Check.js#L115-L117): 数字补零（小于10的数字前加0）

#### 4. 核心校验对象 [checkBox](file://d:\Desktop\组件\QCheck\Check.js#L118-L497)

##### 表单校验相关
- [check({id, myReg, len})](file://d:\Desktop\组件\QCheck\Check.js#L119-L135): 基础校验函数
- [checkNull({value, len})](file://d:\Desktop\组件\QCheck\Check.js#L137-L140): 检测值是否为空
- `checkUserDefined({value, myReg, len})`: 自定义规则校验

##### 企业信息校验
- [checkCompanyName({value, len})](file://d:\Desktop\组件\QCheck\Check.js#L146-L149): 校验公司名称
- [checkCompanyCode({value})](file://d:\Desktop\组件\QCheck\Check.js#L152-L156): 校验统一社会信用代码

##### 个人身份信息校验
- [checkPhone({value})](file://d:\Desktop\组件\QCheck\Check.js#L158-L163): 校验手机号码
- [checkEmail({value})](file://d:\Desktop\组件\QCheck\Check.js#L165-L168): 校验邮箱地址
- [checkName({value, type})](file://d:\Desktop\组件\QCheck\Check.js#L170-L208): 校验姓名（支持多种类型）
- [checkIdCard({value})](file://d:\Desktop\组件\QCheck\Check.js#L210-L230): 校验身份证号码

##### 证件校验
- [checkPassport({value})](file://d:\Desktop\组件\QCheck\Check.js#L232-L236): 校验护照号码
- [checkForeignPassport({value})](file://d:\Desktop\组件\QCheck\Check.js#L238-L242): 校验外国护照
- [checkBirthCertificate({value})](file://d:\Desktop\组件\QCheck\Check.js#L244-L247): 校验出生证明
- [checkHong_Macao_TaiWan({value})](file://d:\Desktop\组件\QCheck\Check.js#L249-L252): 校验港澳台居民居住证
- [checkHong_Macao_CardId({value})](file://d:\Desktop\组件\QCheck\Check.js#L254-L257): 校验港澳居民身份证
- [checkHong_Macao_Passer({value})](file://d:\Desktop\组件\QCheck\Check.js#L259-L264): 校验港澳居民来往内地通行证
- [checkHong_Macao_Return({value})](file://d:\Desktop\组件\QCheck\Check.js#L266-L270): 校验港澳回乡证
- [checkHong_Macao_Idnum({value})](file://d:\Desktop\组件\QCheck\Check.js#L272-L275): 校验港澳身份证
- [TaiWan_Passer({value})](file://d:\Desktop\组件\QCheck\Check.js#L278-L281): 校验台湾居民来往内地通行证
- [checkArmyMan({value})](file://d:\Desktop\组件\QCheck\Check.js#L284-L287): 校验军人证

##### 车辆信息校验
- [checkCarPlate({value})](file://d:\Desktop\组件\QCheck\Check.js#L289-L293): 校验车牌号（中国大陆）
- [checkEBikePlate({value})](file://d:\Desktop\组件\QCheck\Check.js#L295-L306): 校验电动自行车车牌
- [checkVin({value})](file://d:\Desktop\组件\QCheck\Check.js#L308-L312): 校验车架号（VIN码）

##### 日期处理
- [judgeAge(birth, current)](file://d:\Desktop\组件\QCheck\Check.js#L314-L335): 计算年龄
- [calculateAgeInDays(birthDate, currentDate)](file://d:\Desktop\组件\QCheck\Check.js#L336-L343): 计算天数差
- [nowDate()](file://d:\Desktop\组件\QCheck\Check.js#L345-L351): 获取当前日期
- [addTime(time, num)](file://d:\Desktop\组件\QCheck\Check.js#L430-L444): 日期加减运算
- [changeSTime(s_time)](file://d:\Desktop\组件\QCheck\Check.js#L446-L476): 时间调整（整点处理）
- [isLeapYear(time)](file://d:\Desktop\组件\QCheck\Check.js#L478-L482): 判断是否为闰年
- [formatCurrentTime(time, t)](file://d:\Desktop\组件\QCheck\Check.js#L483-L495): 格式化当前时间

#### 5. 状态处理
- `handleStatus({status, element, errorElement, n, length, str})`: 统一处理校验状态显示
- [status(num)](file://d:\Desktop\组件\QCheck\Check.js#L352-L375): 状态码转换

#### 6. 文件类型判断
- [judgePdf(str)](file://d:\Desktop\组件\QCheck\Check.js#L377-L380): 判断字符串是否为 PDF 文件

#### 7. 时间兼容性处理
- [checkTime(time)](file://d:\Desktop\组件\QCheck\Check.js#L382-L429): 检查并格式化时间（兼容 iOS 低版本）

### 使用示例

```javascript
// 校验手机号
const phoneResult = checkBox.checkPhone({value: '13812345678'});

// 校验身份证
const idCardResult = checkBox.checkIdCard({value: '11010119900307789X'});

// 获取身份证中的出生日期
const birthDate = getBirthDate('11010119900307789X');

// 获取URL参数
const paramValue = getUrlDate('userId');
```

### 状态码说明

- `success`: 校验通过
- `null`: 值为空
- `error`: 格式错误
- `short`: 长度不够

这个工具库提供了全面的数据校验功能，可以满足大部分表单验证需求，同时包含了一些常用的工具函数，方便在前端开发中使用。