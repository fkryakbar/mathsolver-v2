import axios from "axios";
import { xml2json } from "xml-js";
import moment from "moment/moment";
import { saveInput } from "../../config/Database";

export default async function handler(req, res) {
  try {
    if (req.method == "POST") {
      const payload = req.body.payload;
      const { data } = await axios.get(
        `http://api.wolframalpha.com/v2/query?appid=${
          process.env.NEXT_PUBLIC_APPID
        }&input=${encodeURIComponent(
          payload
        )}&podstate=Result__Step-by-step+solution&format=image`
      );

      const converted = xml2json(data, { compact: false });
      const object_data = JSON.parse(converted);
      if (object_data.elements[0].attributes.success == "true") {
        await saveInput({
          input: payload,
          timestamp: moment(new Date()).format(),
        });
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
  } catch (err) {
    res.json({
      status: 500,
      message: "something went wrong : " + err,
    });
  }
}
