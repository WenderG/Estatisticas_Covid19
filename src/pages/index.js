import React from "react";
import { Helmet } from "react-helmet";
import { Marker } from "react-leaflet";

import Layout from "components/Layout";
import Container from "components/Container";
import Map from "components/Map";
import Snippet from "components/Snippet";

import { useTracker } from 'hooks'

const LOCATION = {
  lat: 0,
  lng: 0,
};
const CENTER = [LOCATION.lat, LOCATION.lng];
const DEFAULT_ZOOM = 2;

const IndexPage = () => {

  const  { data: countries = [] } = useTracker({
    api: 'countries'
  })

  const  { data: stats = [] } = useTracker({
    api: 'all'
  })

  const hasCountries = Array.isArray(countries) && countries.length > 0

  async function mapEffect({ leafletElement: map} = {}) {
    if(!hasCountries) return

    const geoJson = {
      type: 'FeatureCollection',
      features: countries.map((country = {}) => {
        const { countryInfo = {} } = country
        const { lat, long: lng } = countryInfo
        return {
          type: 'Feature',
          properties: {
            ...country,
          },
          geometry: {
            type: 'Point',
            coordinates: [lng, lat]
          }
        }
      })
    }
  }

  const mapSettings = {
    center: CENTER,
    defaultBaseMap: "OpenStreetMap",
    zoom: DEFAULT_ZOOM,
  };

  const dashboardStats = [
    {
      primary: {
        label: 'Total Cases',
        value: stats?.Cases
      },

      secondary: {
        label: 'Per 1 Million',
        value: stats?.casesPerOneMillion
      },

    },

    {
      primary: {
        label: 'Total Deaths',
        value: stats?.deaths
      },

      secondary: {
        label: 'Per 1 Million',
        value: stats?.deathsPerOneMillion
      },
    },

    {
      primary: {
        label: 'Total Tests',
        value: stats?.tests
      },

      secondary: {
        label: 'Per 1 Million',
        value: stats?.testsPerOneMillion
      },
    },

    {
      primary: {
        label: 'Active Cases',
        value: stats?.active
      },
    },

    {
      primary: {
        label: 'Critical Cases',
        value: stats?.critical
      },
    },

    {
      primary: {
        label: 'Recovered Cases',
        value: stats?.recovered
      },
    }
  ]

  return (
    <Layout pageName="home">
      <Helmet>
        <title>Estatística Covid-19</title>
      </Helmet>

      <Map {...mapSettings}>
        <Marker position={CENTER} />
      </Map>

      {/* <Container type="content" className="text-center home-start">
        <h2>Still Getting Started?</h2>
        <p>Run the following in your terminal!</p>
        <Snippet>
          gatsby new [directory]
          https://github.com/colbyfayock/gatsby-starter-leaflet
        </Snippet>
        <p className="note">
          Note: Gatsby CLI required globally for the above command
        </p>
      </Container> */}
    </Layout>
  );
};

export default IndexPage;
