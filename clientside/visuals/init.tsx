import * as React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import IntroImg from "../images/tron_polished.jpg";

import styles from "../style/app.module.scss";
import { AISetup } from "./aiSetup";
import { PlayerSetup } from "./playerSetup";
import { LobbySetup } from "./lobbySetup";
import { Color, GAME_MODE } from "../../game/types";
import { NEON_RED, NEON_BLUE } from "../../game/literals";

export const InitialForm = ({
  doneCallback,
  children,
  ws,
}: Props): React.ReactElement => {
  const [colorP1, setColorP1]: [
    Color,
    React.Dispatch<React.SetStateAction<Color>>
  ] = React.useState(NEON_RED);
  const [colorP2, setColorP2]: [
    Color,
    React.Dispatch<React.SetStateAction<Color>>
  ] = React.useState(NEON_BLUE);
  const [nameP1, setNameP1] = React.useState("");
  const [nameP2, setNameP2] = React.useState("");
  const [aiSetupToggled, setAiSetupToggled] = React.useState(false);
  const [playerSetupToggled, setPlayerSetupToggled] = React.useState(true);
  const [mode, setMode] = React.useState(GAME_MODE.LOCAL_MULTI);

  const handlePlayerToggle = () => {
    if (!playerSetupToggled) setAiSetupToggled(false);
    setPlayerSetupToggled(!playerSetupToggled);
  };

  const handleAIToggle = () => {
    if (!aiSetupToggled) setPlayerSetupToggled(false);
    setAiSetupToggled(!aiSetupToggled);
  };

  React.useEffect(() => {}, []);
  const handleDone = () => {
    doneCallback({
      p1: {
        color: colorP1,
        name: nameP1,
      },
      p2: {
        color: colorP2,
        name: nameP2,
      },
      mode,
    });
  };

  return (
    <Card
      bg="dark"
      style={{ width: "36rem" }}
      className={styles.center_relative}
    >
      <Card.Img variant="top" src={IntroImg} />
      <Card.Body>
        <Row>
          <Col>
            <Accordion defaultActiveKey="0">
              <Card bg="dark" text="light">
                <Card.Header>
                  <Row>
                    <Col xs={5}>
                      <Form.Check
                        type={"radio"}
                        label={`Local Multiplayer`}
                        className={styles.vert_20}
                        checked={mode === GAME_MODE.LOCAL_MULTI}
                        onChange={() => setMode(GAME_MODE.LOCAL_MULTI)}
                      />
                    </Col>
                    <Col xs={5}>
                      <Accordion.Toggle
                        as={Button}
                        variant={
                          mode === GAME_MODE.LOCAL_MULTI
                            ? "primary"
                            : "secondary"
                        }
                        eventKey="0"
                      >
                        Player Setup
                        {mode === GAME_MODE.LOCAL_MULTI ? "▼" : "►"}
                      </Accordion.Toggle>
                    </Col>
                  </Row>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <PlayerSetup
                    colorP1={colorP1}
                    colorP2={colorP2}
                    setColorP1={setColorP1}
                    setColorP2={setColorP2}
                    setNameP1={setNameP1}
                    setNameP2={setNameP2}
                  />
                </Accordion.Collapse>
              </Card>
              <Card bg="dark" text="light">
                <Card.Header>
                  <Row>
                    <Col xs={5}>
                      <Form.Check
                        type={"radio"}
                        label={`Online Multiplayer`}
                        className={styles.vert_20}
                        checked={mode === GAME_MODE.ONLINE_MULTI}
                        onChange={() => setMode(GAME_MODE.ONLINE_MULTI)}
                      />
                    </Col>
                    <Col xs={5}>
                      <Accordion.Toggle
                        as={Button}
                        variant={
                          mode === GAME_MODE.ONLINE_MULTI
                            ? "primary"
                            : "secondary"
                        }
                        eventKey="1"
                      >
                        Lobby Setup
                        {mode === GAME_MODE.ONLINE_MULTI ? "▼" : "►"}
                      </Accordion.Toggle>
                    </Col>
                  </Row>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                  <LobbySetup ws={ws} />
                </Accordion.Collapse>
              </Card>
              <Card bg="dark" text="light">
                <Card.Header>
                  <Row>
                    <Col xs={5}>
                      <Form.Check
                        type={"radio"}
                        label={`AI Mode`}
                        className={styles.vert_20}
                        checked={mode === GAME_MODE.AI_TRAINING}
                        onChange={() => setMode(GAME_MODE.AI_TRAINING)}
                      />
                    </Col>
                    <Col xs={5}>
                      <Accordion.Toggle
                        as={Button}
                        variant={
                          mode === GAME_MODE.AI_TRAINING
                            ? "primary"
                            : "secondary"
                        }
                        eventKey="2"
                      >
                        AI Setup {mode === GAME_MODE.AI_TRAINING ? "▼" : "►"}
                      </Accordion.Toggle>
                    </Col>
                  </Row>
                </Card.Header>
                <Accordion.Collapse eventKey="2">
                  <AISetup />
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Col>
        </Row>
        <Row className={styles.top_buffer}>
          <Col className={styles.center_col}>
            <Button onClick={handleDone} variant="success" size="lg">
              Play ►
            </Button>
          </Col>
        </Row>
        {children}
      </Card.Body>
    </Card>
  );
};

type Props = {
  doneCallback: (response: SetupResponse) => void;
  children?: React.ReactChildren;
  ws: WebSocket;
};

type PlayerFormFields = {
  name: string;
  color: Color;
};

type SetupResponse = {
  p1: PlayerFormFields;
  p2: PlayerFormFields;
  mode: GAME_MODE;
};
