import { Handler } from "@netlify/functions";
import { wrap } from "@netlify/integrations";
import { withPlanetscale } from "@netlify/planetscale";
import { withAuth0 } from "@netlify/auth0";

const withIntegrations = wrap(withAuth0, withPlanetscale);

export const handler: Handler = withIntegrations(
  async (event, context) => {
    const { connection } = context.planetscale;

    const { rows: users } = await connection.execute("SELECT * FROM  users");

    return {
      statusCode: 200,
      body: JSON.stringify(users),
    };
  },
  {
    auth0: {
      required: true,
      roles: ["admin"],
    },
  }
);