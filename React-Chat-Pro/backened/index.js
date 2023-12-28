// const express = require("express");
// const cors = require("cors");
// const { default: axios } = require("axios");

// const app = express();
// app.use(express.json());
// app.use(cors({ origin: true }));

// app.post("/authenticate", async (req, res) => {
//   const { username } = req.body;
//   try {
//     const r = await axios.put(
//       "https://api.chatengine.io/users/",
//       { username: username, secret: username, first_name: username },
//       { headers: { "Private-Key": "YOUR_PRIVATE_KEY" } }
//     );
//     return res.status(r.status).json(r.data);
//   } catch (e) {
//     return res.status(e.response.status).json(e.response.data);
//   }
// });

// app.listen(3001); 

// Above code can be use to for without using environment

// Below code can be used for usign env 

const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

// Fetch the API key from environment variables
const privateKey = process.env.API_PRIVATE_KEY;

if (!privateKey) {
  console.error("API_PRIVATE_KEY is not set in environment variables.");
  process.exit(1);
}

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;
  try {
    const r = await axios.put(
      "https://api.chatengine.io/users/",
      { username: username, secret: username, first_name: username },
      { headers: { "Private-Key": privateKey } }
    );
    return res.status(r.status).json(r.data);
  } catch (e) {
    return res.status(e.response.status).json(e.response.data);
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


