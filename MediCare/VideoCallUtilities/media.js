export async function setupLocalMedia(localVideoRef) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
    }
    return stream;
  } catch (err) {
    console.error("Media error:", err);
    throw err;
  }
}
