
const config = {
  amqpUrl: process.env.AMQP_URL,
  appPort: process.env.PORT,
  exchanges: {
    processing: 'processing',
  },
  applicationPrefetch: Number(process.env.APP_PREFETCH) || 10,
}

export default config