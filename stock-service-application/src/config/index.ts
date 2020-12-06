
const config = {
  amqpUrl: process.env.AMQP_URL,
  appPort: process.env.PORT,
  exchanges: {
    processing: 'processing',
  },

}

export default config