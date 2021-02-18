/* eslint-disable camelcase */
import { Moment } from "moment";

export default interface TwitterPostInterface {
  data: string;
  test: string;
  public_metrics: {
    retweet_count: number;
    reply_count: number;
    like_count: number;
    quote_count: number;
  };
  created_at: string | Moment;
}
