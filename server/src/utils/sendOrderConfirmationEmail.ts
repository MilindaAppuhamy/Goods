const nodemailer = require("nodemailer");
require("dotenv").config();

//types
type ReceiverType = {
  name: string;
  email: string;
};

module.exports = async function (receiver: ReceiverType, order: any) {
  // Create the order items HTML
  const orderItemsHTML = order
    .map((orderItem: any) => {
      let formattedPrice = `£${(orderItem.item?.price / 100).toFixed(2)}`;
      return `
      <tr>
        <td>
          <img src="${orderItem.item?.image}" alt="Product Image" style="width: 100px; height: 100px;">
        </td>
        <td><h3>${orderItem.item?.name}</h3></td>
        <td><h3>${orderItem.count}</h3></td>
        <td><h3>${formattedPrice}</h3></td>
      </tr>
    `;
    })
    .join("");

  const body = `
                <h3>Hey ${receiver.name},</h3>
            <br>
                <h3>Thank you for your order!</h3>
            <br>
                <h3>Here are the details of your order:</h3>
            <br>
            <br>

            <table border="1" cellspacing="0" cellpadding="5">
                <tbody>
                    ${orderItemsHTML}
                </tbody>
            </table>

            <br>
                <h3>We appreciate your support. If you have any questions, feel free to reach out.</h3>
            <br>
                <h3>Thanks for using Goods!</h3>
            <br>

                <h3>Best,</h3><br>
                <h3>Goods team.</h3>
  `;

  // Create transporter
  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: `${process.env.Sender_Email}`,
      pass: `${process.env.Sender_password}`,
    },
  });

  const mailOptions = {
    from: `Goods team <${process.env.Sender_Email}>`,
    to: receiver.email,
    subject: "Order Confirmation",
    html: `
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          img {
            max-width: 100px;
            height: 100px;
          }
          
          table {
            width: 100% !important;
            border-spacing: 0 !important;
            border-collapse: collapse;
            border-radius: 20px;
          }
          
          table, th, td {
            border: 1px solid #000000;
          }

          h3 {
            font-family: sans-serif;
            padding: 0;
            margin: 0;
            font-weight: normal;
          }
          
        </style>
      </head>
    
      <body style="margin: 0; padding: 0; background-color: #ffffff;">
    
        <!-- Header -->
        <h1 style="font-family: sans-serif; color: #000000;">Hi from Goods</h1> 
            
        <!-- Message -->
        ${body} 
    
      </body>
    </html>
    `,
  };

  await transporter.sendMail(mailOptions, function (error: any, info: any) {
    if (error) {
      console.log(error); //error
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
