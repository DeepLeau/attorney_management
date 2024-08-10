import dbConnect from '@/utils/dbConnect'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
const User = require('@/db-schemas/User')

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await dbConnect()
        const user = await User.findOne({
          email: credentials?.email,
        }).select('+password')

        if (!user) throw new Error('Wrong Email')

        const passwordMatch = await bcrypt.compare(credentials.password, user.password)

        if (!passwordMatch) throw new Error('Wrong Password')
        return user
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.AUTH_SECRET,
}

export default authOptions