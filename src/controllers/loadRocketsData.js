const { createApolloFetch } = require('apollo-fetch');
const { Parser } = require('json2csv');

const json2csv = new Parser({
  includeEmptyRows: true,
})

const endpoint = 'https://api.spacex.land/graphql/';

  const query = `{
    launches {
      rocket {
        rocket {
          name
          active
        }
      }
      mission_name
      upcoming
      launch_date_unix
    }
  }
  `;

module.exports = async function loadRocketsData(req, res) {
  const fetch = createApolloFetch({
    uri: endpoint,
  });

  try {
    const { data: rocketsData } = await fetch({
      query,
    });

    const filteredData = rocketsData.launches.filter(launch => launch.rocket.rocket.active === true && new Date(launch.launch_date_unix * 1000) >= Date.now())

    const csv = filteredData.map(rocket => {
      return {
        name: rocket.rocket.rocket.name,
        mission_name: rocket.mission_name,
        is_in_future: rocket.upcoming,
        launch_date: new Date(rocket.launch_date_unix * 1000).toISOString(),
      }
    })

    return res.status(200).send(json2csv.parse(csv))
  } catch (error) {
    return res.status(400).json({error: error.message})
  }
}