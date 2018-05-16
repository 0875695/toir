import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

export const usersAddFormSchema = new SimpleSchema({
   name: {
      type: String,
      label: () => {
         return TAPi18n.__('User fullname')
      },
      max: 50
   },
   email: {
      type: String,
      regEx: SimpleSchema.RegEx.Email,
      label: () => {
         return TAPi18n.__('E-mail address')
      }
   },
   password: {
      type: String,
      label: () => {
         return TAPi18n.__('Enter a password')
      },
      autoform: {
         type: 'password'
      },
      min: 4,
   },
   confirmPassword: {
      type: String,
      label: () => {
         return TAPi18n.__('Enter the password again')
      },
      autoform: {
         type: 'password'
      },
      min: 4,
      custom() {
         if (this.value !== this.field('password').value) {
            return "passwordMismatch";
         }
      },
   },
   roles: {
      optional: true,
      type: Array,
      label: () => {
         return TAPi18n.__("Roles")
      },
      autoform: {
         type: "select-checkbox",
         options: [{
               label: 'Диспетчер',
               value: 'dispatcher'
            },
            {
               label: 'Администратор',
               value: 'admin'
            }
         ]
      }
   },
   'roles.$': {
      type: String,
      allowedValues: ['admin', 'dispatcher']
   }
}, {
   tracker: Tracker
});
