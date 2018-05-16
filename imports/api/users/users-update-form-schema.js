import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

export const usersUpdateFormSchema = new SimpleSchema({
   _id: {
      type: String,
      autoform: {
         type: 'hidden'
      }
   },
   name: {
      type: String,
      label: () => {
         return TAPi18n.__('User fullname')
      },
      max: 50
   },
   email: {
      type: String,
      autoform: {
         disabled: true
      },
      regEx: SimpleSchema.RegEx.Email,
      label: () => {
         return TAPi18n.__('E-mail address')
      },
      optional: true
   },
   password: {
      type: String,
      label: () => {
         return TAPi18n.__('Enter a password')
      },
      autoform: {
         type: 'password'
      },
      optional: true,
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
      optional: true,
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
