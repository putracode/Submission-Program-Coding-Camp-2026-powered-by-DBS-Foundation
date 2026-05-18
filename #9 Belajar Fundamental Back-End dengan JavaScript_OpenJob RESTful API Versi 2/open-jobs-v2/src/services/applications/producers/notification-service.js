import amqp from "amqplib";
import dotenv from "dotenv";

dotenv.config();

const NotificationService = {
  sendMessage: async (queue, message) => {
    const connection = await amqp.connect({
      protocol: "amqp",
      hostname: process.env.RABBITMQ_HOST,
      port: process.env.RABBITMQ_PORT,
      username: process.env.RABBITMQ_USER,
      password: process.env.RABBITMQ_PASSWORD,
    });

    const channel = await connection.createChannel();
    await channel.assertQueue(queue, {
      durable: true,
    });

    await channel.sendToQueue(queue, Buffer.from(message));

    setTimeout(() => {
      connection.close();
    }, 1000);
  },
};

export default NotificationService;
