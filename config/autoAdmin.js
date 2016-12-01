module.exports.autoAdmin = {
  enabled: true,
  user: {
    username: 'admin',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@admin.com',
    password: '12345',
    group: 'Admins'
  },
  groups: [
    {
      name: 'Admins',
      description: 'Default Admin Group',
      accessLevel: 2 //admin level is >= 2
    },
    {
      name: 'Users',
      description: 'Default User Group',
      accessLevel: 1
    }
  ]
};
