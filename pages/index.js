import Head from 'next/head';
import Header from '../Components/Header';
import Nav from '../Components/Nav';
import Results from '../Components/Results';
import requests from '../Utils/requests';
import { NextPage, GetServerSideProps } from 'next';

export default function Home({ results }) {
  console.log(results);
  return (
    <div>
      <Head>
        <title>Hulu 2.0</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />

      <Nav />

      <Results results={results} />
    </div>
  );
}

export async function getServerSideProps(context) {
  console.log(process.env);
  const genre = context.query.genre;
  const request = await fetch(
    `https://api.themoviedb.org/3${
      requests[genre]?.url || requests.fetchTrending.url
    }`
  ).then((res) => res.json());
  return {
    props: {
      results: request.results,
    },
  };
}