import axios from 'axios';
import { saveAs } from 'file-saver';

export const downloadImgFetch = (
  url: string,
  description: string | undefined
) => {
  axios
    .get(`${url}&client_id=SOPOVCNGvYl3DOy-4n5LJHUb94oax27VdhZ4g3v1gh0`)
    .then((response) => {
      if (response) {
        saveAs(
          response.data.url,
          description ? `${description.substring(0, 30)}.png` : 'image.png'
        );
      }
    });
};
