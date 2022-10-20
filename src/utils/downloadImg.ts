import axios from 'axios';
import { saveAs } from 'file-saver';

export const downloadImgFetch = (
  url: string,
  description: string | undefined
) => {
  axios
    .get(`${url}&client_id=npSG8DeRNQsPiJv00JjJfo6d_hN-n47wb4yWQ8sjTcs`)
    .then((response) => {
      if (response) {
        saveAs(
          response.data.url,
          description ? `${description.substring(0, 30)}.png` : 'image.png'
        );
      }
    });
};
