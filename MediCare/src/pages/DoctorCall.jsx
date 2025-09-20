import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import {
  createPeerConnection,
  acceptOffer,
  addRemoteCandidates,
} from "../../VideoCallUtilities/peerConnection";
const BASE_URL = import.meta.env.VITE_BASE_URL;
function DoctorCall() {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const [polling, setPolling] = useState(false);

  // Setup local media on component mount
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

  // Main polling logic
  useEffect(() => {
    if (!polling) return;

    const interval = setInterval(async () => {
      try {
        const res = await axios.get("BAS/VideoCall/DoctorPoll/");

        if (res.data && res.data.user_id) {
          console.log("✅ Received patient offer:", res.data);
          clearInterval(interval); // Stop polling once we have an offer
          setPolling(false);

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

          // Create a promise that resolves when local ICE gathering is complete
          const iceGatheringComplete = new Promise((resolve) => {
            pc.onicegatheringstatechange = () => {
              if (pc.iceGatheringState === "complete") {
                resolve();
              }
            };
          });

          // =======================================================
          // ## THE FIX IS HERE: RE-ORDERING THESE TWO BLOCKS ##
          // =======================================================

          // 1. FIRST: Set remote description from the patient's offer.
          const answerSDP = await acceptOffer(pc, res.data.sdp);
          console.log("✅ Patient's offer accepted, answer created.");

          // 2. THEN: Add the patient's ICE candidates. This will now work.
          addRemoteCandidates(pc, res.data.ice_candidates || []);
          console.log("✅ Patient's ICE candidates added.");

          // =======================================================

          console.log("Answer created, waiting for local ICE candidates...");

          // 3. Wait for our own ICE candidates to be gathered.
          await iceGatheringComplete;
          console.log("Local ICE gathering complete.");

          // 4. Send our answer and our complete list of candidates back to the patient.
          await axios.post(`${BASE_URL}/VideoCall/DoctorPoll/`, {
            patient_id: res.data.user_id,
            sdp: answerSDP,
            ice_candidates: localCandidates,
          });

          console.log("✅ Answer and ICE candidates sent to patient.");
        }
      } catch (err) {
        console.error("Error polling for patient:", err);
      }
    }, 5000);

    // Cleanup interval on component unmount or when polling stops
    return () => clearInterval(interval);
  }, [polling]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Doctor Video Call</h1>
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
          <h2>Patient Video</h2>
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-full bg-black rounded"
          />
        </div>
      </div>
      <button
        onClick={() => setPolling(true)}
        disabled={polling}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        {polling ? "Waiting for Patient..." : "Receive Patient Call"}
      </button>
    </div>
  );
}

export default DoctorCall;
