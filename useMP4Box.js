console.log('MP4Box: ', MP4Box);

const fileInput = document.getElementById('input');
fileInput.onchange = async () => {
  const selectedFile = fileInput.files[0]; // Blob Object

  // Convert Blob to ArrayBuffer
  selectedFile.arrayBuffer().then((arrayBuffer) => {
    const mp4boxfile = MP4Box.createFile();

    // mp4boxfile.onReady = function (info) {
    //   console.log('Received File Information', info);
    // };

    arrayBuffer.fileStart = 0; // MP4Box needs each buffer to have a custom `fileStart` property, supposedly telling which slice of the file this ArrayBuffer refers to.
    mp4boxfile.appendBuffer(arrayBuffer);
    mp4boxfile.flush();

    console.log(mp4boxfile);

    const meta = mp4boxfile.boxes.find((b) => b.type === 'meta');
    console.log('meta', meta);
  });
};
