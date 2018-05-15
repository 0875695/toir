import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

const regExpMessages = [
  { exp: SimpleSchema.RegEx.Email, msg: 'должен быть существующим email адресом' },
  { exp: SimpleSchema.RegEx.EmailWithTLD, msg: 'должен быть существующим email адресом' },
  { exp: SimpleSchema.RegEx.Domain, msg: 'должен быть реальным доменом' },
  { exp: SimpleSchema.RegEx.WeakDomain, msg: 'должен быть реальным доменом' },
  { exp: SimpleSchema.RegEx.IP, msg: 'должен быть IPv4 или IPv6 address' },
  { exp: SimpleSchema.RegEx.IPv4, msg: 'должен быть IPv4 адресом' },
  { exp: SimpleSchema.RegEx.IPv6, msg: 'должен быть IPv6 адресом' },
  { exp: SimpleSchema.RegEx.Url, msg: 'должен быть настоящим URL' },
  { exp: SimpleSchema.RegEx.Id, msg: 'ID должен содержать только буквы и цифры' },
  { exp: SimpleSchema.RegEx.ZipCode, msg: 'должен быть настоящим почтовым индексом' },
  { exp: SimpleSchema.RegEx.Phone, msg: 'должен быть настоящим телефонным номером' },
];

const defaultMessages = {
  initialLanguage: 'ru',
  messages: {
    ru: {
      required: '{{{label}}} является обязательным полем',
      minString: '{{{label}}} должен состоять минимум из {{min}} символов',
      maxString: '{{{label}}} не может превышать длину в {{max}} символов',
      minNumber: '{{{label}}} должен состоять минимум из {{min}} цифр',
      maxNumber: '{{{label}}} не может превышать длину в {{max}} цифр',
      minNumberExclusive: '{{{label}}} должно быть больше {{min}}',
      maxNumberExclusive: '{{{label}}} должно быть меньше {{max}}',
      minDate: '{{{label}}} должно быть не раньше {{min}}',
      maxDate: '{{{label}}} не может быть позже {{max}}',
      badDate: '{{{label}}} является недопустимой датой',
      minCount: 'Вы должны указать минимум {{minCount}} значений',
      maxCount: 'Вы не можете указать больше {{maxCount}} значений',
      noDecimal: '{{{label}}} должно быть целым числом',
      notAllowed: '{{{value}}} не допустимое значение',
      expectedType: '{{{label}}} должно быть типа {{dataType}}',
      passwordMismatch: 'Пароли должны совпадать'
      regEx({
        label,
        regExp,
      }) {

        let msgObj;
        if (regExp) {
          msgObj = _.find(regExpMessages, (o) => o.exp && o.exp.toString() === regExp);
        }

        const regExpMessage = msgObj ? msgObj.msg : 'failed regular expression validation';

        return `${label} ${regExpMessage}`;
      },
      keyNotInSchema: '{{name}} is not allowed by the schema',
    },
  },
};

SimpleSchema.setDefaultMessages(defaultMessages);
