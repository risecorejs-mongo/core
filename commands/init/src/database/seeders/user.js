const bcrypt = require('bcryptjs')

    const records = [
      {
        role: 'admin',
        email: 'admin@example.com',
        password: await bcrypt.hash('change-me', 1)
      },
      {
        role: 'manager',
        email: 'manager@example.com',
        password: await bcrypt.hash('change-me', 1)
      },
      {
        role: 'default',
        email: 'user@example.com',
        password: await bcrypt.hash('change-me', 1)
      }
    ]
