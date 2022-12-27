import { count } from "../../config/Database";

export default async function handler(req, res) {
  try {
    if (req.method == "GET") {
      const total = await count();
      res.json({
        status: 200,
        payload: total,
      });
    }
  } catch (err) {
    res.json({
      status: 400,
      message: "something went wrong : " + err,
    });
  }
}
