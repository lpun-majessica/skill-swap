const { SKILLS } = require("../../../lib/constant.js");

SKILLS.slice(4, SKILLS.length).map(async (skill) => {
  try {
    const response = await fetch("http://localhost:3000/api/skills", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: skill }),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
});
