import axios from 'axios'

export default async function downloadPDF(){

    const response = await axios.get('http://www.africau.edu/images/default/sample.pdf');
    // downloadFile should shape [ Buffer <12 ....>]
    // Buffer.concat(response)

    return response;

}