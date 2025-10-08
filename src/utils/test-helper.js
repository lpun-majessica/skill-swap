export const users = [
  {
    fullname: "Alex Johnson",
    username: "alexj",
    email: "alexj@email.com",
    skillsToTeach: ["68383d72ee97ee11c4c3af72", "683833f94f8431623efc58fd"],
    skillsToLearn: ["68383dacee97ee11c4c3af74"],
    bio: "Frontend developer who loves clean code.",
    job: "Frontend Developer",
    _id: "6839260a139193caf0fd2737",
  },
  {
    fullname: "Bella Martinez",
    username: "bella.design",
    email: "bella.design@email.com",
    skillsToTeach: ["683833f94f8431623efc58fd"],
    skillsToLearn: ["68383d72ee97ee11c4c3af72"],
    bio: "Designer curious about frontend dev.",
    job: "UI/UX Designer",
    _id: "683931d94b133bcff5e6b665",
  },
];

export const connections = [
  {
    _id: "6853d5557ddcf8fc0c4ec874",
    sender_id: "6839260a139193caf0fd2737",
    receiver_id: "683931d94b133bcff5e6b665",
    isAccepted: false,
  },
];

export const notifications = [
  {
    _id: "6853d5557ddcf8fc0c4ec874",
    sender: "6839260a139193caf0fd2737",
    receiver: "683931d94b133bcff5e6b665",
    type: "createConnection",
    isRead: false,
  },
  {
    _id: "6853d5557ddcf8fc0c4ec876",
    sender: "683931d94b133bcff5e6b665",
    receiver: "6839260a139193caf0fd2737",
    type: "acceptConnection",
    isRead: false,
  },
];

export const skills = [
  { _id: "68383d72ee97ee11c4c3af72", name: "JavaScript" },
  { _id: "683833f94f8431623efc58fd", name: "HTML" },
  { _id: "68383dacee97ee11c4c3af74", name: "CSS" },
];
