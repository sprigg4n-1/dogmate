import NextAuth from 'next-auth/next';
import { dbConnect } from '@/lib/mongo';
import { User } from '@/queries/users';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},

      async authorize(credentials) {
        const { confirmInputText, confirmPass } = credentials;

        try {
          await dbConnect();

          let user;
          if (confirmInputText.includes('@')) {
            user = await User.findOne({ email: confirmInputText });
          } else {
            user = await User.findOne({ nickname: confirmInputText });
          }

          if (!user) {
            return null;
          }

          console.log(user.password, confirmPass);

          const passwordMatch = await bcrypt.compare(
            confirmPass,
            user.password
          );

          if (!passwordMatch) {
            return null;
          }

          return {
            id: user._id,
            name: user.name,
            surname: user.surname,
            nickname: user.nickname,
            email: user.email,
            role: user.role,
            isVerified: user.isVerified,
            age: user.age,
            photoUrl: user.photoUrl,
            sex: user.sex,
            description: user.description,
            contactInfo: user.contactInfo,
            rating: user.rating,
          };
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.surname = user.surname;
        token.nickname = user.nickname;
        token.email = user.email;
        token.role = user.role;
        token.isVerified = user.isVerified;
        token.age = user.age;
        token.photoUrl = user.photoUrl;
        token.sex = user.sex;
        token.description = user.description;
        token.contactInfo = user.contactInfo;
        token.rating = user.rating;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.surname = token.surname;
        session.user.nickname = token.nickname;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.isVerified = token.isVerified;
        session.user.age = token.age;
        session.user.photoUrl = token.photoUrl;
        session.user.sex = token.sex;
        session.user.description = token.description;
        session.user.contactInfo = token.contactInfo;
        session.user.rating = token.rating;
      }
      return session;
    },
  },
  secret:
    '31c66f42bda7ec966772a4c1f8609558131feaf6666c506e8961f4ffcf77008795b356fb4495ee87e7e450b7fbb4506755e9ed86c12fe58d5862c6849f63cc35',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
