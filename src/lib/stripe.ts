import Stripe from 'stripe'

const { STRIPE_SECRET_KEY } = process.env

if (STRIPE_SECRET_KEY === undefined) {
  throw new Error('STRIPE_SECRET_KEY must be defined')
}

export const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
  appInfo: {
    name: 'Ignite Shop',

  }
})