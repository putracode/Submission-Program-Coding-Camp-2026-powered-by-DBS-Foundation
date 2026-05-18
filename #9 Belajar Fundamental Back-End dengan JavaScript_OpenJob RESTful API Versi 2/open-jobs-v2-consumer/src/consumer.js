import "dotenv/config";
import amqp from "amqplib";
import MailSender from "./MailSender.js";
import Listener from "./Listener.js";
import ApplicationService from "./ApplicationService.js";

const init = async () => {
  const applicationService = new ApplicationService();
  const mailSender = new MailSender();
  const listener = new Listener(applicationService, mailSender);

  const connection = await amqp.connect({
    protocol: "amqp",
    hostname: process.env.RABBITMQ_HOST,
    port: process.env.RABBITMQ_PORT,
    username: process.env.RABBITMQ_USER,
    password: process.env.RABBITMQ_PASSWORD,
  });

  const channel = await connection.createChannel();
  await channel.assertQueue("notification:applications", {
    durable: true,
  });
  channel.consume("notification:applications", listener.listen, { noAck: true });
};
init();
