const { default: axios } = require("axios");

exports.initialKhaltiPayment = async (req, res) => {
  const { amount, orderId } = req.body;
  console.log(req.body);
  if (!amount || !orderId) {
    return res.status(400).json({
      message: "Pleased provide Amount and OrderId",
    });
  }

  const data = {
    return_url: "http://localhost:3000",
    purchase_order_id: orderId,
    amount: amount,
    website_url: "http://localhost:3000",
    purchase_order_name: "ordername" + orderId,
  };
  try {
    const response = await axios.post(
      "https://a.khalti.com/api/v2/epayment/initiate/",
      data,
      {
        headers: {
          " Authorization": "key 37bfc5fa500a40f9901e5a3e67eec4ee",
        },
      }
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

exports.verifiedPayment = async (req, res) => {
  const pidx = req.query.pidx;
  const response = await axios.post(
    "https://a.khalti.com/api/v2/epayment/lookup/	",
    { pidx },
    {
      headers: {
        " Authorization": "key 37bfc5fa500a40f9901e5a3e67eec4ee",
      },
    }
  );
  console.log(response);
  res.send(response.data);
};
