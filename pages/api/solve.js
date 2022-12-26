import axios from "axios";
import { xml2json } from "xml-js";
export default async function handler(req, res) {
  if (req.method == "POST") {
    const payload = req.body.payload;
    const { data } = await axios.get(
      `http://api.wolframalpha.com/v2/query?appid=LYP6W3-AAYW45TYQU&input=${encodeURIComponent(
        payload
      )}&podstate=Result__Step-by-step+solution&format=image`
    );

    const converted = xml2json(data, { compact: false });
    const object_data = JSON.parse(converted);
    if (object_data.elements[0].attributes.success == "true") {
      res.json({
        status: 200,
        payload: object_data.elements[0].elements,
      });
    } else {
      res.json({
        status: 400,
        message: "We're unable to solve your problem",
      });
    }
  }
}
