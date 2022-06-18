import { firebaseConfig } from 'config/config'

export const BASE_AUTH_URL_MOCK = `${firebaseConfig.authApiUrl}/`

export const AUTH_USER_MOCK = {
  email: 'test@email.com',
  displayName: 'Name',
  password: 'Password1',
}

export const USER_DATA_MOCK = {
  localId: 'rTf4wqjZfSP6wLVQKrHISmuHKbk2',
  email: 'test@test.pl',
  displayName: 'Rafał',
  emailVerified: false,
  createdAt: '1649193295275',
  incompleteData: false,
}

export const FOOD_ITEM_MOCK = {
  id: '1',
  name: 'Choco Sundae',
  price: 29.99,
  description: 'Choco Sundae Cup (100 ml)',
  img: 'https://api.pizzahut.io/v1/content/en-in/in-1/images/dessert/choco-sundae.e0d29fd156012e251c099c2771219d18.1.jpg?width=800',
}
