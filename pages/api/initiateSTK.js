import unirest from "unirest";

const consumerKey = "Y6ssvACrnlg7yHRRyC2kLUKGeVAlhYhJ";
const consumerSecret = "PzWD34Et70s0lFZu";

export default function handler(req, res) {
  if (req.method === "POST") {
    const base64Key = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
      "base64"
    );

    unirest(
      "GET",
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    )
      .headers({
        Authorization: `Basic ${base64Key}`,
      })
      .send()
      .end((_res) => {
        if (_res.error) {
          res.status(500).json({ error: "Failed to fetch access token" });
          return;
        }

        console.log(JSON.parse(_res?.raw_body).access_token);
        unirest(
          "POST",
          "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
        )
          .headers({
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(_res?.raw_body)?.access_token}`,
          })
          .send(
            JSON.stringify({
              BusinessShortCode: 174379,
              Password:
                "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjMwNzIxMTk0OTIy",
              Timestamp: "20230721194922",
              TransactionType: "CustomerPayBillOnline",
              Amount: 1,
              PartyA: 254748920306,
              PartyB: 174379,
              PhoneNumber: 254748920306,
              CallBackURL:
                "https://estore-rho-bay.vercel.app/api/mpesaCallback",
              AccountReference: "Elektonics",
              TransactionDesc: "Payment of X",
            })
          )
          .end((_res) => {
            if (_res.error) {
              res.status(500).json({ error: "Failed to initiate STK" });
            }
            res.status(200).json(_res.raw_body);
          });
      });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
