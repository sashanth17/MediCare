// src/mockData.js

export const queries = [
  {
    id: 1,
    sessionId: "8A3F-20250924",
    summary: "Sharp lower back pain, numbness in leg",
    timestamp: "Sept 24, 2025, 07:40 AM",
    status: "New",
    conversation: [
      {
        sender: "Patient",
        text: "I've had a sharp pain in my lower back for three days. It feels like a pinched nerve and sometimes my left leg feels tingly and a bit numb.",
      },
      {
        sender: "MediCare Ai",
        text: "I understand you're experiencing sharp lower back pain with tingling and numbness in your leg. Can you tell me if you've had any recent injuries?",
      },
      {
        sender: "Patient",
        text: "No, I haven't fallen or lifted anything heavy. It started after a long drive.",
      },
      {
        sender: "MediCare Ai",
        text: "Based on the symptoms you've described, especially the combination of back pain and leg numbness, it is important to consult a medical professional. I cannot provide a diagnosis. Please see a doctor for a proper evaluation.",
      },
    ],
  },
  {
    id: 2,
    sessionId: "7B2E-20250923",
    summary: "Sudden rash on arms, mild fever, itching",
    timestamp: "Sept 23, 2025, 09:15 PM",
    status: "New",
    conversation: [
      {
        sender: "Patient",
        text: "I woke up with a red, itchy rash all over my arms and I have a slight fever.",
      },
      {
        sender: "MediCare Ai",
        text: "I hear your concern about the rash and fever. Have you eaten anything unusual or been in contact with new plants or animals?",
      },
      { sender: "Patient", text: "Not that I can think of." },
      {
        sender: "MediCare Ai",
        text: "While many rashes are harmless, a rash accompanied by a fever should be evaluated by a healthcare provider to rule out any infections. I am unable to identify the cause and recommend you seek medical advice.",
      },
    ],
  },
  {
    id: 3,
    sessionId: "6C1D-20250923",
    summary: "Questions about medication side effects",
    timestamp: "Sept 23, 2025, 05:30 PM",
    status: "Resolved",
    conversation: [
      {
        sender: "Patient",
        text: "I started taking Metformin and I'm feeling very nauseous. Is this normal?",
      },
      {
        sender: "MediCare Ai",
        text: "Nausea can be a side effect of Metformin, especially when you first start taking it. However, I cannot give medical advice. It's best to discuss this side effect with the doctor who prescribed it.",
      },
    ],
  },
];
