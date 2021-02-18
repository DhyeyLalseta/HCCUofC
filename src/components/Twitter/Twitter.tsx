import React from "react";
import { Row, Card, Col } from "react-bootstrap";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";
import moment from "moment";
import "./Twitter.scss";
import _ from "lodash";
import TwitterPostInterface from "../../types/twitterTypes";

const Twitter = ({
  timelineData,
}: {
  timelineData: TwitterPostInterface[] | null;
}): JSX.Element => {
  let dayEngagement: {
    dayCreated: string;
    totalEngagement: number;
  }[] = [];

  let typeEngagement: {
    name: string;
    value: number;
    colour: string;
  }[] = [];

  if (timelineData !== null) {
    dayEngagement = _(timelineData)
      // eslint-disable-next-line camelcase
      .groupBy(({ created_at }) => moment.utc(created_at).format("MM/DD"))
      .map((postsInDay, day: string) => ({
        dayCreated: day,
        // eslint-disable-next-line camelcase
        totalEngagement: _.sumBy(postsInDay, ({ public_metrics }) =>
          _.sum(_.values(public_metrics))
        ),
      }))
      .value()
      .reverse();

    typeEngagement = _(timelineData[0].public_metrics)
      .keys()
      .map((key) => ({
        name: key,
        value: _.sumBy(timelineData, (postData) =>
          _.get(postData, ["public_metrics", key])
        ),
        // eslint-disable-next-line no-bitwise
        colour: `#${(((1 << 24) * Math.random()) | 0).toString(16)}`,
      }))
      .value();
  }
  return (
    <>
      <Row className="twitter-row-1 d-flex flex-row w-100 justify-content-space-between">
        <Col xs="8">
          <Card className="text-center w-100 h-100">
            <Card.Title className="mb-0 mt-3">line</Card.Title>
            <Card.Body className=" w-100 h-100 p-1">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={dayEngagement}
                  margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="dayCreated" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="totalEngagement"
                    stroke="red"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
        <Col xs="4">
          <Card className="text-center w-100 h-100">
            <Card.Title className="mb-0 mt-3">pie chart hehe</Card.Title>
            <Card.Body className="justify-content-center w-100 h-100 p-1">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={typeEngagement}
                    dataKey="value"
                    nameKey="name"
                    fill="blue"
                    label
                  >
                    {typeEngagement.map(({ colour }, index) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <Cell key={index} fill={colour} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Twitter;
