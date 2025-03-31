import {
  Body,
  Text,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Section,
  Hr,
  Row,
  Column,
} from "@react-email/components";

export const Email = () => {
  return (
    <Html lang="es" dir="ltr">
      <Head>
        <title>My email title</title>
      </Head>
      <Body
        style={{
          backgroundColor: "#f5f5f5",
          padding: "0px",
          fontFamily: "Roboto, Arial, Helvetica, sans-serif",
        }}
      >
        <Container
          style={{ backgroundColor: "#fff", width: "640px", padding: "16px" }}
        >
          <Section style={{ width: "640px", textAlign: "center" }}>
            <Img
              width="100px"
              style={{ margin: "auto" }}
              src="https://bucket.mlcdn.com/a/2368/2368526/images/0cfb31b6fecdf0e4cdeeaba5b88c6ae3aee20f71.png"
            />
          </Section>
          <Section style={{ width: "640px", textAlign: "center" }}>
            <Heading>¡Reserva tu puesto de trabajo con zityhub!</Heading>
            <Text>
              Accede a más de 150 espacios de trabajo en 3 sencillos pasos
            </Text>
            <Img
              style={{ width: "100%" }}
              src="https://bucket.mlcdn.com/a/2368/2368526/images/bc08dadfed31b91999d18870accadb16a656a1e3.png"
            />
          </Section>
          <Hr />
          <Section style={{ width: "640px" }}>
            <Text>Hola, STORY-2839</Text>
            <Text>¡Te damos la bienvenida a zityhub!</Text>
            <Text>
              Somos la red de espacios de trabajo flexibles exclusiva para
              profesionales. A partir de hoy podrás reservar nuestros puestos de
              trabajo y salas de reuniones para el día y la hora que tú quieras.
            </Text>
            <Text>
              Te ofrecemos más de 150 espacios de trabajo (coworkings, sedes
              corporativas y hoteles) repartidos por toda España, contando con
              más de 2000 hot desks y 400 salas de reuniones.
            </Text>
            <Text>
              Para la gestión de reservas contarás a partir de ahora con la
              tecnología de zityhub.
            </Text>
            <Text>
              Por este motivo, cuando quieras reservar tu espacio de trabajo o
              sala de reunión, debes seguir los siguientes pasos.
            </Text>
          </Section>
          <Hr />
          <Section>
            <Row>
              <Column style={{ width: "50%", verticalAlign: "top" }}>
                <Img
                  style={{ width: "100%" }}
                  src="https://bucket.mlcdn.com/a/2368/2368526/images/97b711c4c0698305070b5d042930747f82275828.png"
                />
              </Column>
              <Column style={{ width: "50%", verticalAlign: "top" }}>
                <Heading as="h3">PASO 1</Heading>
                <Text>
                  Accede a la web de zityhub pulsando en Comenzar, o visita
                  app.zityhub.com.
                </Text>
                <Text>
                  ¡Recuerda! Puedes utilizar cualquier navegador para acceder
                  (Chrome, Safari, Opera, ...).
                </Text>
                <Text>Tus credenciales son:</Text>
                <Text>usuario: diaz+story-2839@zityhub.com</Text>
                <Text>contraseña: 646961</Text>
              </Column>
            </Row>
            <Row>
              <Column style={{ width: "50%", verticalAlign: "top" }}>
                <Img
                  style={{ width: "100%" }}
                  src="https://bucket.mlcdn.com/a/2368/2368526/images/97b711c4c0698305070b5d042930747f82275828.png"
                />
              </Column>
              <Column style={{ width: "50%", verticalAlign: "top" }}>
                <Heading as="h3">PASO 2</Heading>
                <Text>
                  Selecciona la el hub, y reserva tu Desk o Sala de reunión para
                  el día (y hora) que quieras ir.
                </Text>
                <Text>
                  ¡Y listo! Ya tendrás acceso para ese espacio el día que has
                  indicado.
                </Text>
              </Column>
            </Row>
            <Row>
              <Column style={{ width: "50%", verticalAlign: "top" }}>
                <Img
                  style={{ width: "100%" }}
                  src="https://bucket.mlcdn.com/a/2368/2368526/images/97b711c4c0698305070b5d042930747f82275828.png"
                />
              </Column>
              <Column style={{ width: "50%", verticalAlign: "top" }}>
                <Heading as="h3">PASO 3</Heading>
                <Text>
                  Para poder acceder al espacio, debes hacer check-in escaneando
                  el código QR del cartel de zityhub que encontrarás en la
                  recepción de cada hub.
                </Text>
              </Column>
            </Row>
          </Section>
          <Section>
            <Heading as="h3">
              ¡Recuerda! Es necesario reservar siempre que quieras ir a
              cualquier espacio de la red
            </Heading>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};
