import { useState } from "react";
import styles from "../styles/Home.module.css";
import LazyLoad from "react-lazyload";
import Skeleton from "react-loading-skeleton";
import PropTypes from "prop-types";
import ImageListItem from "@material-ui/core/ImageListItem";

export default function Image({
  item: { scaled_url, download_url, scaledHeight, scaledWidth },
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const aspectRatio = `calc(100%/(${scaledWidth}/${scaledHeight}))`;

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <ImageListItem
      className={styles.responsiveContainer}
      sx={{ paddingBottom: aspectRatio }}
      height={scaledHeight}
      data-testid="image-wrapper"
    >
      <Skeleton
        className={`${styles.image} ${isLoaded ? styles.hide : null}`}
      />
      <LazyLoad
        offset={600}
        height={scaledHeight}
        placeholder={<div className={styles.image}></div>}
      >
        <a href={download_url} target="_blank" rel="noopener noreferrer">
          <img
            className={`${styles.image} 
            ${isLoaded ? styles.loaded : styles.loading}`}
            src={scaled_url}
            alt={download_url}
            height={scaledHeight}
            onLoad={handleLoad}
          ></img>
        </a>
      </LazyLoad>
    </ImageListItem>
  );
}

Image.defaultProps = {
  scaled_url: "",
  download_url: "",
  scaledHeight: "",
  scaledWidth: "",
};

Image.propTypes = {
  scaled_url: PropTypes.string.isRequired,
  download_url: PropTypes.string.isRequired,
  scaledHeight: PropTypes.string.isRequired,
  scaledWidth: PropTypes.string.isRequired,
};
