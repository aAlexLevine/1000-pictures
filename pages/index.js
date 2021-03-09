import Head from "next/head";
import axios from "axios";
import { useEffect, useState } from "react";
import ImageList from "@material-ui/core/ImageList";
import CssBaseline from "@material-ui/core/CssBaseline";
import useColumnQuery from "../hooks/useColumnQuery";
import Image from "../components/Image";
import Loading from "../components/Loading";
import shuffle from "../utils/shuffle"

export default function Home() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const columns = useColumnQuery();

  useEffect(() => {
    setLoading(true);

    const maxPages = 10;

    const getImagesByPage = (page) => {
      return axios
        .get(`https://picsum.photos/v2/list?page=${page}&limit=100`)
        .then(({ data }) => data);
    };

    const pageRequests = [...new Array(maxPages)].map((item, index) => {
      const page = index + 1;
      return getImagesByPage(page);
    });

    const addScaledImageURLs = (data) => {
      return data.map(({ id, height, width, ...rest }) => {
        const scaledWidth = 400;
        const quotient = height / width;
        const scaledHeight = Math.round(quotient * scaledWidth);
        const scaled_url = `https://picsum.photos/id/${id}/${scaledWidth}/${scaledHeight}`;
        return { ...rest, scaled_url, scaledWidth, scaledHeight };
      });
    };

    Promise.all(pageRequests)
      .then((pages) => {
        const concatedPagesData = pages.reduce(
          (acc, curr) => [...acc, ...curr],
          []
        );
        const withScaledImageURLs = addScaledImageURLs(concatedPagesData);
        setImages(shuffle(withScaledImageURLs));
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <CssBaseline />
      <Head>
        <title>1000 Images</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ImageList variant="masonry" cols={columns} gap={8}>
        {images.map((item) => (
          <Image key={item.download_url} item={item}/>
        ))}
      </ImageList>
    </div>
  );
}
