export function addRemoteCandidates(pc, remoteCandidatesInput) {
  try {
    const candidates = remoteCandidatesInput
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    candidates.forEach((c) => {
      const candidate = JSON.parse(c);
      pc.addIceCandidate(new RTCIceCandidate(candidate));
    });

    alert("✅ Remote candidates added!");
  } catch (err) {
    console.error("Candidate error:", err);
  }
}
