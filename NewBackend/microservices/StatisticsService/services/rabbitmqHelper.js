import { connect } from "amqplib";

const messageQueueConnectionString = process.env.AMQP_URL || 'amqp://localhost';


const listenForMessages = async function listenForMessages(consume) {
    // connect to Rabbit MQ
    let connection = await connect(messageQueueConnectionString);

    // create a channel and prefetch 1 message at a time
    let channel = await connection.createChannel();
    await channel.prefetch(1);

    // create a second channel to send back the results
    let resultsChannel = await connection.createConfirmChannel();

    // start consuming messages
    await consume({ connection, channel, resultsChannel });
}

export {listenForMessages};