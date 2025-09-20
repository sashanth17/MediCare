import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import {
  createPeerConnection,
  createOffer,
  acceptAnswer,
  addRemoteCandidates,
} from "../../VideoCallUtilities/peerConnection";
const BASE_URL = import.meta.env.VITE_BASE_URL;

function PatientCall() {
  const userId = 1; // hardcoded for testing
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);

  const [callStarted, setCallStarted] = useState(false); // New state to trigger polling

  // Setup local media on mount
  useEffect(() => {
    async function setupMedia() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing local media:", err);
      }
    }
    setupMedia();
  }, []);

  // Poll for doctor's answer
  useEffect(() => {
    // Only start polling if the call has been initiated
    if (!callStarted) return;

    console.log("Starting to poll for answer...");
    const interval = setInterval(async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/VideoCall/patient_get_answer/?user_id=${userId}`
        );

        if (response.data && response.data.sdp) {
          console.log("✅ Received answer from doctor:", response.data);
          clearInterval(interval); // Stop polling
          setCallStarted(false); // Reset for potential future calls

          await acceptAnswer(peerConnectionRef.current, response.data.sdp);
          console.log("✅ Answer accepted");

          addRemoteCandidates(
            peerConnectionRef.current,
            response.data.ice_candidates || []
          );
          console.log("✅ Doctor's ICE candidates added");
        } else {
          console.log("Polling... No answer yet.");
        }
      } catch (err) {
        console.error("Error fetching answer:", err);
      }
    }, 5000); // Polling every 5 seconds

    return () => clearInterval(interval);
  }, [callStarted]); // This effect now correctly depends on callStarted

  const handleConsultDoctor = async () => {
    try {
      const localCandidates = [];
      const onIceCandidateCallback = (event) => {
        if (event.candidate) {
          localCandidates.push(JSON.stringify(event.candidate));
        }
      };

      const pc = createPeerConnection(
        localVideoRef,
        remoteVideoRef,
        onIceCandidateCallback
      );
      peerConnectionRef.current = pc;

      const iceGatheringComplete = new Promise((resolve) => {
        pc.onicegatheringstatechange = () =>
          pc.iceGatheringState === "complete" && resolve();
      });

      const offerSDP = await createOffer(pc);
      console.log("Offer created, waiting for ICE candidates...");

      await iceGatheringComplete;
      console.log("ICE gathering complete.");

      await axios.post(`${BASE_URL}/VideoCall/CreateOffer/`, {
        user_id: userId,
        sdp: offerSDP,
        ice_candidates: localCandidates,
      });

      console.log("✅ Offer and ICE candidates sent to server.");
      setCallStarted(true); // This will trigger the polling useEffect
    } catch (err) {
      console.error("Error starting call:", err);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Patient Video Call</h1>
      <div className="grid grid-cols-2 gap-6 mb-4">
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
          <h2>Doctor Video</h2>
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-full bg-black rounded"
          />
        </div>
      </div>
      <button
        onClick={handleConsultDoctor}
        disabled={callStarted}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {callStarted ? "Connecting..." : "Consult Doctor"}
      </button>
    </div>
  );
}

export default PatientCall;
