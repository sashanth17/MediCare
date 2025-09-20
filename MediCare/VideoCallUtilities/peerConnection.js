// peerConnection.js
// WebRTC helper functions for creating offers, answers, and managing ICE candidates

// Create a new RTCPeerConnection
export function createPeerConnection(
  localVideoRef,
  remoteVideoRef,
  onIceCandidateCallback // Accept a callback function
) {
  const pc = new RTCPeerConnection({
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  });

  // Add local stream tracks
  const localStream = localVideoRef.current?.srcObject;
  if (localStream) {
    localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));
  }

  // Set remote stream to remote video element
  pc.ontrack = (event) => {
    if (
      remoteVideoRef.current &&
      remoteVideoRef.current.srcObject !== event.streams[0]
    ) {
      console.log("✅ Received remote stream");
      remoteVideoRef.current.srcObject = event.streams[0];
    }
  };

  // Use the provided callback for ICE candidates
  pc.onicecandidate = onIceCandidateCallback;

  // For debugging
  pc.oniceconnectionstatechange = () => {
    console.log("ICE Connection State:", pc.iceConnectionState);
  };
  pc.onconnectionstatechange = () => {
    console.log("Peer Connection State:", pc.connectionState);
  };

  return pc;
}

// Create Offer from local peer
export async function createOffer(pc) {
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  return offer.sdp;
}

// Accept remote Offer and generate Answer
export async function acceptOffer(pc, remoteSDP) {
  const offerDesc = new RTCSessionDescription({
    type: "offer",
    sdp: remoteSDP,
  });
  await pc.setRemoteDescription(offerDesc);

  const answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);
  return answer.sdp;
}

// Accept remote Answer (set remote description)
export async function acceptAnswer(pc, remoteSDP) {
  const answerDesc = new RTCSessionDescription({
    type: "answer",
    sdp: remoteSDP,
  });
  await pc.setRemoteDescription(answerDesc);
}

// Add remote ICE candidates to PeerConnection
export function addRemoteCandidates(pc, candidates) {
  if (!pc || !candidates) return;

  candidates.forEach((c) => {
    if (typeof c === "string" && c.trim() !== "") {
      try {
        pc.addIceCandidate(new RTCIceCandidate(JSON.parse(c))).catch((err) => {
          console.error("Error adding remote candidate:", err);
        });
      } catch (err) {
        console.error("Failed to parse ICE candidate:", err, c);
      }
    }
  });
}
