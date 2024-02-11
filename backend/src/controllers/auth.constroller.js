import { prisma } from '../../prisma/index.js'
import { GraphQLError } from 'graphql'
import JWT from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { getUserById } from '../Services/user.service.js'

const createUserInDB = async (_, payload) => {
  console.log('Creating user', payload)

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email: payload.User.email }, { username: payload.User.username }],
    },
  })

  if (existingUser) {
    console.log('EXISTING USER', existingUser)
    throw new GraphQLError('User already exist ', {
      extensions: {
        code: 'USER_ALREADY_EXISTS',
      },
    })
  }

  const hashedPassword = await bcrypt.hash(payload.User.password, 10)
  payload.User.password = hashedPassword

  const user = await prisma.user.create({
    data: payload.User,
  })
  return user
}

const loginUser = async (_, payload) => {
  console.log('Logging in user', payload)

  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: payload.email }, { username: payload.username }],
    },
  })

  if (!user) {
    console.log('NO USER', user)
    throw new GraphQLError('User does not exist ', {
      extensions: {
        code: 'USER_DOES_NOT_EXIST',
      },
    })
  }

  // compare passwords
  const isMatch = await bcrypt.compare(payload.password, user.password)

  if (!isMatch) {
    console.log('PASSWORDS DO NOT MATCH', isMatch)
    throw new GraphQLError('Passwords do not match ', {
      extensions: {
        code: 'PASSWORDS_DO_NOT_MATCH',
      },
    })
  }

  const token = JWT.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  })

  console.log('TOKEN', token)

  return token
}

const getAllUserData = () => {
  console.log('Get All User Data')

  const users = prisma.$queryRaw`SELECT * FROM "User"`
  console.log(users)
  return users
}

const getCurrentUser = async (_, __, context) => {
  if (context && context.userId) {
    const user = await getUserById(context.userId)
    console.log('USERUSER : ', user)
    return user
  }
  throw new Error('I dont know who are you')
}

export { createUserInDB, getAllUserData, loginUser, getCurrentUser }
