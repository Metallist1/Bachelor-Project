'use strict';

const amqp = require('amqplib');

// RabbitMQ connection string
const messageQueueConnectionString = process.env.AMQP_URL || 'amqp://localhost';

async function setup() {
    console.log("Setting up RabbitMQ Exchanges/Queues");
    // connect to RabbitMQ Instance
    let connection = await amqp.connect(messageQueueConnectionString);

    // create a channel
    let channel = await connection.createChannel();

    // create exchange
    await channel.assertExchange("users", "direct", { durable: true });

    // create queues
    await channel.assertQueue("users.connected", { durable: true });
    await channel.assertQueue("users.disconnected", { durable: true });
    // bind queues
    await channel.bindQueue("users.connected","users", "connected");
    await channel.bindQueue("users.disconnected","users", "disconnected");


    console.log("Setup Done");
    process.exit();
}

setup();