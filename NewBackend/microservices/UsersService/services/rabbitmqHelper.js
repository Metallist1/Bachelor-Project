

import { connect } from "amqplib";

const messageQueueConnectionString = process.env.AMQP_URL || 'amqp://localhost';

// utility function to publish messages to a channel
const publishToChannel = async function publishToChannel( { routingKey, exchangeName, data }) {
    var channel = await openChannel();
    return new Promise((resolve, reject) => {
        channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(data), 'utf-8'), { persistent: true }, function (err, ok) {
            if (err) {
                return reject(err);
            }

            resolve();
        })
    });
}

async function openChannel() {
    let connection = await connect(messageQueueConnectionString);
    let channel = await connection.createConfirmChannel();
    return channel;
 }


export {publishToChannel};