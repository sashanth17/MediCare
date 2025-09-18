import React, { useRef, useState, useEffect } from "react";
import { setupLocalMedia } from "../../VideoCallUtilities/media";
import {
  createPeerConnection,
  createOffer,
  acceptOffer,
  acceptAnswer,
} from "../../VideoCallUtilities/peerConnection";
import { addRemoteCandidates } from "../../VideoCallUtilities/candidates";

function VideoCallPage() {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);

  const [offerSDP, setOfferSDP] = useState("");
  const [answerSDP, setAnswerSDP] = useState("");
  const [remoteSDPInput, setRemoteSDPInput] = useState("");
  const [localCandidates, setLocalCandidates] = useState([]);
  const [remoteCandidatesInput, setRemoteCandidatesInput] = useState("");

  useEffect(() => {
    setupLocalMedia(localVideoRef);
  }, []);

  const startCall = async () => {
    const pc = createPeerConnection(
      localVideoRef,
      remoteVideoRef,
      setLocalCandidates
    );
    peerConnectionRef.current = pc;
    await createOffer(pc, setOfferSDP);
  };

  const handleAcceptOffer = async () => {
    const pc = createPeerConnection(
      localVideoRef,
      remoteVideoRef,
      setLocalCandidates
    );
    peerConnectionRef.current = pc;
    await acceptOffer(pc, remoteSDPInput, setAnswerSDP);
  };

  const handleAcceptAnswer = async () => {
    await acceptAnswer(peerConnectionRef.current, remoteSDPInput);
  };

  const handleAddCandidates = () => {
    addRemoteCandidates(peerConnectionRef.current, remoteCandidatesInput);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manual WebRTC Test</h1>

      {/* Video Section */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h2>Your Video</h2>
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full bg-black rounded"
          />
        </div>
        <div>
          <h2>Remote Video</h2>
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-full bg-black rounded"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-4 space-x-2">
        <button
          onClick={startCall}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Create Offer
        </button>
        <button
          onClick={handleAcceptOffer}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Accept Offer → Generate Answer
        </button>
        <button
          onClick={handleAcceptAnswer}
          className="px-4 py-2 bg-purple-600 text-white rounded"
        >
          Accept Answer
        </button>
      </div>

      {/* Offer / Answer / Candidates */}
      {offerSDP && (
        <div className="mt-4">
          <h3>Offer SDP (copy this to remote):</h3>
          <textarea
            value={offerSDP}
            readOnly
            rows={6}
            className="w-full p-2 border rounded"
          />
        </div>
      )}

      {answerSDP && (
        <div className="mt-4">
          <h3>Answer SDP (copy this back):</h3>
          <textarea
            value={answerSDP}
            readOnly
            rows={6}
            className="w-full p-2 border rounded"
          />
        </div>
      )}

      <div className="mt-4">
        <h3>Paste Remote SDP Here:</h3>
        <textarea
          value={remoteSDPInput}
          onChange={(e) => setRemoteSDPInput(e.target.value)}
          rows={6}
          className="w-full p-2 border rounded"
        />
      </div>

      {localCandidates.length > 0 && (
        <div className="mt-4">
          <h3>Local ICE Candidates (copy to remote):</h3>
          <textarea
            value={localCandidates.join("\n")}
            readOnly
            rows={6}
            className="w-full p-2 border rounded text-xs"
          />
        </div>
      )}

      <div className="mt-4">
        <h3>Paste Remote ICE Candidates (newline separated):</h3>
        <textarea
          value={remoteCandidatesInput}
          onChange={(e) => setRemoteCandidatesInput(e.target.value)}
          rows={6}
          className="w-full p-2 border rounded text-xs"
        />
        <button
          onClick={handleAddCandidates}
          className="mt-2 px-4 py-2 bg-orange-600 text-white rounded"
        >
          Add Remote Candidates
        </button>
      </div>
    </div>
  );
}

export default VideoCallPage;
