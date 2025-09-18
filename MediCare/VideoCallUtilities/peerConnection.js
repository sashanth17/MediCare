export function createPeerConnection(
  localVideoRef,
  remoteVideoRef,
  setLocalCandidates
) {
  const pc = new RTCPeerConnection({
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  });

  // Add local tracks
  const localStream = localVideoRef.current?.srcObject;
  if (localStream) {
    localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));
  }

  // Remote stream
  pc.ontrack = (event) => {
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = event.streams[0];
      remoteVideoRef.current
        .play()
        .catch((err) => console.warn("Autoplay prevented:", err));
    }
  };

  // ICE candidates
  pc.onicecandidate = (event) => {
    if (event.candidate) {
      setLocalCandidates((prev) => [...prev, JSON.stringify(event.candidate)]);
    }
  };

  pc.onicegatheringstatechange = () => {
    if (pc.iceGatheringState === "complete") {
      console.log("✅ All ICE candidates gathered!");
    }
  };

  return pc;
}

export async function createOffer(pc, setOfferSDP) {
  let offer = await pc.createOffer();
  if (offer.sdp.includes("VP8")) {
    offer.sdp = offer.sdp.replace("VP8", "H264"); // Safari compatibility
  }
  await pc.setLocalDescription(offer);
  setOfferSDP(JSON.stringify(offer));
}

export async function acceptOffer(pc, remoteSDPInput, setAnswerSDP) {
  const remoteOffer = JSON.parse(remoteSDPInput);
  await pc.setRemoteDescription(new RTCSessionDescription(remoteOffer));
  let answer = await pc.createAnswer();
  if (answer.sdp.includes("VP8")) {
    answer.sdp = answer.sdp.replace("VP8", "H264");
  }
  await pc.setLocalDescription(answer);
  setAnswerSDP(JSON.stringify(answer));
}

export async function acceptAnswer(pc, remoteSDPInput) {
  const remoteAnswer = JSON.parse(remoteSDPInput);
  await pc.setRemoteDescription(new RTCSessionDescription(remoteAnswer));
}
