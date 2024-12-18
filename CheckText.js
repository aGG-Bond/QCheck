export const checkText = {
  t_company: {// 企业名称
    name: 'checkCompanyName',
    // myReg:'',
    // type: 'chinese_and_english',
    text: '企业名称'
  },
  t_code: { // 统一社会信用代码
    name: 'checkCompanyCode',
    length: {
      maxLength: 18,
    },
    isToUpperCase: true, // 是否转换为大写
    text: '统一社会信用代码'
  }, 
  t_company_name: {
    name: 'checkName',
    type: 'chinese_dot_or_english',
    text: '联系人',
    length: {
      minLength: 2,
    }
  }, // 企业联系人
  t_company_tel: { 
    name: 'checkPhone',
    text: '联系电话',
    length: {
      maxLength: 11
    }
  }, // 企业联系电话
  t_email: { 
    name: 'checkEmail',
    text: '邮箱'
  }, // 邮箱
  t_address: {  // 地址
    dom: '#t_address',
    name: 'checkNull',
    text: '地址'
  },
  t_address_detail: {  // 详细地址
    name: 'checkUserDefined',
    myReg: /^.{4,}$/,// 不能为字符串
    text: '详细地址'
  },
  s_time: {
    name: 'checkNull',
    text: '起保时间'
  },
  t_person_name: {  // 雇员名称
    name: 'checkName',
    type: 'chinese_dot_or_english',
    text: '姓名'
  },
  type: {
    dom: '#card-type',
    name: 'checkNull',
    placeholder: "请输入证件类型",
    text: '证件类型',
    labelArr: [
      {
        id: '1',
        value: '身份证',
      },
      {
        id: '15',
        value: '港澳台居民居住证',
      },
      {
        id: '14',
        value: '外国护照',
      },
      {
        id: '23',
        value: '港澳居民来往内地通行证',
      },
      {
        id: '24',
        value: '台湾居民往来大陆通行证',
      }
    ],
    required: 0,
    isArrow: 1,
    readonly: 1,
    isDefult: 1,
    inputType: 'text',
  },
  t_person_paper_num: {  // 雇员身份证
    name: 'checkIdCard',
    text: '证件号码',
  },
  insured_sex: {
    dom: '#insured_sex',
    name: 'checkNull',
    text: '性别',
    labelArr: [{
      id: '1',
      value: '男'
    },
    {
      id: '0',
      value: '女'
    }],
    required: 1,
    readonly: 1,
    class: 'same'
  },
  insured_birth:{
    name: 'checkNull',
    text: '出生日期',
    placeholder: '请选择出生日期',
    required: 1,
    readonly: 1,
    class: 'same'
  },
  t_person_tel: {  // 雇员手机号
    name: 'checkPhone',
    text: '手机号码',
    length: {
      maxLength: 11,
    }
  },
  t_venue_area: {
    dom: '#t_venue_area',
    name: 'checkNull',
    text: '场馆占地面积',
    data: [
      {id: '1',value:'1-500平'},
      {id: '2',value:'500-1000平'},
      {id: '3',value:'1000-2000平'},
      {id: '4',value:'2000-10000平'},
    ],
    callback: (indexArr,n)=>{
      
      console.log('abc',indexArr,n)
    },
    additionalOptions: {} // 额外的参数
  },
  b_address: {  // 地址
    dom: '#b_address',
    name: 'checkNull',
    text: '地址'
  },
  b_address_detail: {  // 详细地址
    name: 'checkUserDefined',
    myReg: /^.{4,}$/,// 不能为字符串
    text: '详细地址'
  },
}
