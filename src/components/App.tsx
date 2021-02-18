import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import TwitterPostInterface from "../types/twitterTypes";
import Home from "./Home";
import Twitter from "./Twitter";
import Sidebar from "./Sidebar";
import "./App.scss";

const App = (): JSX.Element => {
  const [twitterTimelineData, setTwitterTimelineData] = useState<
    TwitterPostInterface[] | null
  >(null);

  useEffect(() => {
    const fetchTwitterTimelineData = async () => {
      try {
        const twitterPostsData: TwitterPostInterface[] | [] = await (
          await axios.get("/api/twitter")
        ).data.data;
        setTwitterTimelineData(twitterPostsData);
      } catch (err: unknown) {
        console.error(err);
      }
    };
    fetchTwitterTimelineData();
  }, []);

  return (
    <>
      <Container fluid className="App h-100">
        <Router>
          <Row className="flex-row main-view h-100 d-flex justify-content-center">
            <Col xs="2" className="sidebar-col h-100 position-fixed p-0">
              <Sidebar paths={["/", "/twitter"]} />
            </Col>
            <Col
              xs="10"
              className="dash d-flex justify-content-center align-items-center offset-2"
            >
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/twitter">
                  <Twitter timelineData={twitterTimelineData} />
                </Route>
              </Switch>
            </Col>
          </Row>
        </Router>
      </Container>
    </>
  );
};

export default App;
